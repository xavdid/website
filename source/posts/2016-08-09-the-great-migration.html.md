---
title: The Great Migration
fact:
fact_year:
tags: tumblr, programming, ruby, tutorial, jq
published: false
---

As I'm back in the job market, I figured it was time to clean up some of my site internals. I've learned a lot about a lot since I first built it and my scss in particular was really showing its age. While I was in the trenches, I realized there was another big pain point I could fix: my blog.

For a long time, I had my blog in two places. It actually lived on tumblr, but I mirrored it on the blog section of my site using tumblr's APIv1. This was accomplished with some jQuery that would trigger on load and populate a `<ul>` element.

This was _fine_, but it meant I was maintaining two sets of css and user experience was inconsistent depending on which platform they were reading on. I was already leveraging [middleman]() to generate my static site and found that they have a [blogging]() extension. Moving all my posts would allow me to check my posts into git and use triple ` notation for code blocks. The only hiccup was that tumblr has no way to export all of your posts, so it was time to dive back into their API. The game was afoot.

READMORE

## Extracting from Tumblr

Tumblr's APIv1 is all but depreciated at this point, so I went with v2 for my task. Luckily, it's simple and well documented. I'll describe here how to use tumblr's API to extract all of your content from their platform, should you choose to leave. To get all of our files in the right place, we'll go through a few steps:

1. Get an API key
2. Download all the posts we want
3. (optional) format our json nicely
4. Convert json to markdown.

### Make an App

While anybody could hit a public blog before, v2 requires an API key. To get one, head [here]() and click **New App**, naming it whatever. Below, you should now see an id, known now as your `<API_KEY>`. You'll need this in just a sec.

### Grab Some Posts

You'll need to hit a url with your new key. I used `curl` so I could pipe the output into another step or two, but [Postman]() is a viable alternative. Running the following command in your terminal gives you a json file with info on your 20 most recent posts.

```bash
curl 'https://api.tumblr.com/v2/blog/<BLOG_NAME>.tumblr.com/posts?api_key=<API_KEY>&filter=raw' > some_posts.json
```

The output is a json document with a ton of info, like so:

```json
{
    "response": {
        "posts": [
            {
                "id": "asdf",
                "title": "I am a post",
                "date": "2015-09-16 00:04:22 GMT"
            }, {
                "id": "asdf",
                "title": "I am an older post",
                "date": "2015-07-03 00:14:22 GMT"
            },
            ...
        ]
    }
}
```

There's a lot of extra data there, so it's worth cleaning it it up a bit.

### (optional) Cleaning our Data

The tool for the job is [jq]() and it parses json into a specified format. We're going to tack the following line onto our `curl` command from before:

```bash
jq '[.response.posts[] | {body: .body, date: .date, title: .title, slug: .slug}]'
```

Let's unpack that command because it's rather dense.

* `.response.posts` grabs the value of the response and posts keys (that is, our array of posts). The `[]` at the end tell jq to iterate over the array (as opposed to using `.response.posts[0]` if we were only concerned with the most recent post).
* `|` works just like the unix pipe, sending the output of the last command into the next one.
* `{body: .body, date: .date, title: .title, slug: .slug}` instructs jq to iterate over the array and turn it into an object with the _body_, _date_, _title_, and _slug_ keys, which are really all we're concerned with. the `[]` that wrap the entire command specify that the output should be an array as well.

Put it all together and we've got concise json to convert.

```bash
curl 'https://api.tumblr.com/v2/blog/<BLOG_NAME>.tumblr.com/posts?api_key=<API_KEY>&filter=raw' | jq '[.response.posts[] | {body: .body, date: .date, title: .title, slug: .slug}]' > some_posts.json
```

Two quick notes on the options you can pass to tumblr:

* `filter` tells the API how to return your posts. I originally wrote in markdown, so I wanted to specify that I should get it out as well.
* the API only returns 20 posts at a time. To get more, add `&offset=<NUMBER>` to your url. Luckily I had around 30, so I only needed to call it twice. Your experience may differ.

You can see the full set of filters [here]().

### Converting to Markdown

We've got this well formatted json, this is the easy part. This ruby script iterates through the posts, adds our [frontmatter](), and supplies the filename middleman expects(`2016-12-06-this-is-a-post.md`).

```ruby
# If you skipped the cleaning step, your keys will be different
require 'json'
require 'time'

def frontmatter(title)
  "---\ntitle: #{title}\ntags:\n---\n\n)"
end

posts = nil

File.open('some_posts.json', 'r') do |f|
  posts = JSON.parse(f.read, symbolize_names: true)
end

posts.each do |post|
  # make sure it's the local date
  date = Time.parse(post[:date]).getlocal.strftime('%Y-%m-%d').to_s
  slug = post[:slug].split('-').first(5).join('-') # shorten those tumblr slugs
  File.open("#{date}-#{slug}.html.md", 'wb+') do |f|
    f.write(frontmatter(post[:title]))
    # turn smart quotes into regular ones
    f.write(post[:body].gsub(/[\u201c\u201d]/, '"'))
  end if post[:body] # ignore posts without bodies
end
```

```markdown
---
title: I am a Post
tags:
---

This is the body of the [post]() and so many people will eventually read it
...
```

## That's All!

Boom! The result is a bunch of markdown posts that look a whole lot like [this](https://github.com/xavdid/xavdid.github.io). I checked my new files into git and deployed and now you're reading this.

Hopefully this has made the experience of exporting your tumblr archive fairly painless. There's a lot of options if your tumblr was more varied than my stack of text-only posts, but I bet you can handle it. If you've got questions, I'm available on Twitter ([@xavdid](https://www.twitter.com/xavdid)). Until next time!
