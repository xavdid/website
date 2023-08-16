---
date: "2016-07-08"
title: Heroku CLI Plugins and You
fact: Reports are broadcast that a UFO crash landed in Roswell, New Mexico in what became known as the Roswell UFO incident.
fact_year: 1947
tags: [Heroku, JavaScript, programming, tutorial]
---

We as developers are working in a golden age of programming where pushing code has never been easier. My personal favorite place to deploy things is [Heroku](https://heroku.com) because of its customizability, clear (and cheap) pricing structure, and powerful tools.

The most powerful place developers interact with the Heroku platform is on the command line. The recent release of a new version of their [CLI](https://github.com/heroku/cli) gave me a great excuse to rewrite an abandoned plugin that I relied on. Unfortunately, save a pair of very helpful doc pages, there were relatively few resources on some of the corner cases you hit while developing a plugin. Here, I'll aim to guide you through some of them.

If you want to follow along, I'd recommend installing the cli [here](https://toolbelt.heroku.com/).

## So You Want to Write a Plugin

The point of developing a plugin is to add functionality to the Heroku CLI. Plugins usually hit the Heroku API and have the advantage of taking the burden of auth off of your shoulders.

As a starting point, I'd recommend going through their article [Developing CLI Plugins](https://devcenter.heroku.com/articles/developing-cli-plug-ins). It's got a great tutorial which spins you up on the general structure of a plugin. I'm aiming to provide detail to parts of that, but I won't just retype what they've already said. So, if you feel like you've missed stuff, bounce over there once in a while.

### CLI Command Structure

Heroku commands are run with the prefix `heroku` paired with a **topic** and optionally, a **command**. Your plugin will add new commands to topics (existing or your own). Interestingly, you can overwrite default commands (such as `config:add`), though I'd **strongly** recommend against it. Running `heroku help` gives you a brief overview of all the available topics:

```
% heroku help
Usage: heroku COMMAND [--app APP] [command-specific-options]

Primary help topics, type "heroku help TOPIC" for more details:

  addons    #  manage add-on resources
  apps      #  manage apps (create, destroy)
  auth      #  authentication (login, logout)
  config    #  manage app config vars
  ...
```

If you're going to create a new topic, your module will need to export a `topic` object in addition to the command(s). [^1]

### Plugin Layout

At the end of the day, your plugin's `main` file will need to export a `Command` object (or an array of them). The full set of keys you can use is [here](https://devcenter.heroku.com/articles/developing-cli-plug-ins#all-command-options), but there are a few you'll most likely need:

| Key             | Type     | Usage                                                                                                     |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| topic           | string   | CLI category your command(s) fall under (eg. **config**:pull)                                             |
| command         | string   | the command name (eg. config:**pull**)                                                                    |
| description[^2] | string   | help that pops up when `heroku help <topic>` is run                                                       |
| needsApp        | bool     | whether or not the command will act upon a specific app (either inferred or specified). Defaults to false |
| needsAuth       | bool     | whether or not the command needs write access to the app. Defaults to false                               |
| flags           | object   | defines the settings your command can be run with                                                         |
| run             | function | the main function for your command                                                                        |

### The Function Itself

You pass `Command.run` a function which is the actual functionality of your command. This function is passed just one argument, `context`.

```javascript
module.exports = {
  topic: "do",
  command: "things",
  description: "does things",
  needsApp: false,
  flags: [
    {
      name: "file",
      char: "f",
      hasValue: true,
      description: "specify target filename",
    },
  ],
  run: function (context) {
    console.log(context);
  },
};
```

That object contains info about the command, the app (if provided), and environment in which the command is run. It looks like this when run from a plugin in development:

```javascript
// command: heroku do:things -f cool_file.txt

{ topic: null,
  command: <COMMAND_OBJECT>,
  app: '<SPECIFIED_APP_NAME>',
  args: [],
  flags: { file: 'cool_file.txt' },
  cwd: '/Users/<USERNAME>/path/to/directory',
  herokuDir: '/Users/<USERNAME>/.cache/heroku',
  debug: false,
  debugHeaders: false,
  dev: true,
  supportsColor: true,
  version: 'heroku-cli/5.2.24-4b7e305 (darwin-amd64) go1.6.2 heroku-config/1.0.2 node-v6.2.1',
  apiToken: '<API_TOKEN>',
  apiHost: 'api.heroku.com',
  apiUrl: 'https://api.heroku.com',
  gitHost: 'heroku.com',
  httpGitHost: 'git.heroku.com',
  auth: { password: '<API_TOKEN>' } }
```

The keys you'll use most often are `args` and `flags`, but there's other helpful things there as well (such as whether or not the command is run in development mode).

Chances are you'll want to interact with the Heroku API in your plugin. You'll note that `context` has auth information for the user, but rather than learn the entire Heroku API and auth methods yourself, they've conveniently provided an authenticated API wrapper. To access this, include the `heroku-cli-util` module and wrap your function in the `.command()` method like so:

```javascript
const cli = require("heroku-cli-util");

module.exports = {
  topic: "do",
  command: "things",
  description: "does things",
  needsApp: true,
  needsAuth: true,
  flags: [
    {
      name: "file",
      char: "f",
      hasValue: true,
      description: "specify target filename",
    },
  ],
  run: cli.command((context, heroku) => {
    return heroku.get("/<AUTH_REQUIRED_ROUTE>").then((data) => {
      cli.debug(data);
    });
  }),
};
```

`heroku` is an authenticated instance of their [api client](https://github.com/heroku/node-heroku-client#usage). HTTP calls created this way will return a promise. Make sure to return your promise chain at the end of your function so whatever is running the command (either the CLI or tests) handles it correctly.

### Should You Use Generators?

That's a good question! The docs [recommend](https://devcenter.heroku.com/articles/developing-cli-plug-ins#using-the-heroku-api) doing so for code clarity, and I tend to agree. Instead of having a chain of promises your asynchronous code looks remarkably synchronous.

There are a [lot](https://davidwalsh.name/es6-generators) of [great](https://alexperry.io/javascript/2015/09/17/es6-generators-and-asynchronous-javascript.html) resources available for learning the in-depth details of how generators work, but you can definitely get by without them. The quick and dirty of it is this:

- You declare a generator function by preceding the name with an asterisk
- Inside that function, you can `yield` certain structures (a function, promise, generator, array, or object), which will pause the function until they're fulfilled. Arrays and objects will process all their requests in parallel and are a great way to perform multiple requests.

Generators work really well with the `co` module because it provides a lot of syntactic sugar and control-flow options, making everything place nicely together. You can read more about it [here](https://github.com/tj/co).

That's really it! Using generators, we can rewrite the code from before more cleanly:

```javascript
const cli = require("heroku-cli-util");
const co = require("co");

module.exports = {
  topic: "do",
  command: "things",
  description: "does things",
  needsApp: true,
  needsAuth: true,
  flags: [
    {
      name: "file",
      char: "f",
      hasValue: true,
      description: "specify target filename",
    },
  ],
  run: cli.command(
    co.wrap(function* (context, heroku) {
      let data = yield heroku.get("/<AUTH_REQUIRED_ROUTE>");
      cli.debug(data);
    })
  ),
};
```

The `co.wrap()` function takes a generator and turns it into a regular function that returns a promise, perfect for our previous code that expects a regular promise-returning function anyway.

### Surfacing Errors

One of the big gotchas for using `co` is that errors get eaten silently. Luckily, `yield` statements work great with your standard javascript `try/catch` block!

```javascript
cli.command(co.wrap(function* (context, heroku) {
  try {
    let data = yield heroku.get('/<AUTH_REQUIRED_ROUTE>')
    cli.debug(data)
  } catch (err) => {
    cli.exit(1, err)
  }
}))
```

Did you catch that last bit? The `cli` package provides a helpful `exit()` method for when things go sour. It takes an error code[^3] and a description of the issue. This approach to errors has the clear advantage of quitting any execution in addition to printing an error message to the user.

### Shipping Your Plugin

They've got pretty concise instructions for that [here](https://devcenter.heroku.com/articles/developing-cli-plug-ins#releasing-plugins).

Your plugin doesn't have to be named `heroku-NAME`, but it will help people find it! In either case, any npm package can be installed with `heroku plugins:install NAME` (though that command will fail if the installed plugin isn't exporting a well-formatted Heroku plugin).

## tl;dr

- [This article](https://devcenter.heroku.com/articles/developing-cli-plug-ins) is wildly helpful
- Export a [command](https://devcenter.heroku.com/articles/developing-cli-plug-ins#all-command-options)
- Return a promise from your main function (if doing any async work) or use ES6 generators (with `co`)
- Wrap yield statements in a `try/catch` block and use `cli.exit()` to surface errors

That's should get you on your way. Hope you've enjoyed wetting your whiskers with the Heroku CLI. Definitely reach out to me on Twitter ([@xavdid](https://www.twitter.com/xavdid)) with questions or feedback. Happy hacking!

---

_Full disclosure: Heroku is owned by the same company (Salesforce) that I was formerly employed by. That being said, I used and enjoyed their services long before I was a SFDC employee and the time I put into this was my own._

[^1]: Near as I can tell, a `topic` object has only the `name` and `description` keys, the latter of which is what pops up in the index when `heroku help` is run.
[^2]: the `help` flag is similar, but provides a longer description. It shows up when you run `heroku help <TOPIC>:<COMMAND>`
[^3]: You can provide any integer as the error code. Conventionally, `0` means success and anything else (most commonly `1`) means there was an error. If you want your command to play nicely in a scripting environment, `1` is a great choice regardless of the content of the error
