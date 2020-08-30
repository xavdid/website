---
date: "2016-08-09"
title: The Great Migration
fact: Tivoli Gardens, one of the oldest still intact amusement parks in the world, opens in Copenhagen, Denmark.
fact_year: 1843
tags: [tumblr, programming, ruby, tutorial, jq]
---

As I'm back in the job market, I figured it was time to clean up some of my site internals. I've learned a lot about a lot since I first built it and my scss in particular was really showing its age. While I was in the trenches, I realized there was another big pain point I could fix: my blog.

For a long time, I had my blog in two places. It actually lived on tumblr, but I mirrored it on the blog section of my site using tumblr's APIv1. This was accomplished with some jQuery that would trigger on load and populate a `<ul>` element.

This was _fine_, but it meant I was maintaining two sets of css and user experience was inconsistent depending on which platform they were reading on. I was already leveraging [middleman](https://middlemanapp.com) to generate my static site and found that they have a [blogging](https://middlemanapp.com/basics/blogging) extension. Moving all my posts would allow me to check my posts into git and use triple ` notation for code blocks. The only hiccup was that tumblr has no way to export all of your posts, so it was time to dive back into their API. The game was afoot.

## Extracting from Tumblr

Tumblr's APIv1 is all but depreciated at this point, so I went with v2 for my task. Luckily, it's simple and well documented. I'll describe here how to use tumblr's API to extract all of your content from their platform, should you choose to leave. To get all of our files in the right place, we'll go through a few steps:

1. Get an API key
2. Download all the posts we want
3. (optional) format our json nicely
4. Convert json to markdown.

### Make an App

While anybody could hit a public blog before, v2 requires an API key. To get one, head [here](https://www.tumblr.com/oauth/apps) and click **+ Register application**, naming it whatever. Below, you should now see your "OAuth Consumer Key", known now as your `<API_KEY>`. You'll need this in just a sec.

### Grab Some Posts

You'll need to hit a url with your new key. I used `curl` so I could pipe the output into another step or two, but [Postman](https://www.getpostman.com/) is a viable alternative. Running the following command in your terminal gives you a json file with info on your 20 most recent posts.

```bash
curl 'https://api.tumblr.com/v2/blog/<BLOG_NAME>.tumblr.com/posts?api_key=<API_KEY>&filter=raw' > some_posts.json
```

The output is a json document with a ton of info, truncated here like so:

```json
{
  "meta": {
    "status": 200,
    "msg": "OK"
  },
  "response": {
    "blog": {
      "title": "Blog (dot) DavidBrownman (dot) com",
      "name": "xavdid",
      "total_posts": 29,
      "posts": 29,
      "url": "http://xavdid.tumblr.com/",
      "updated": 1442361862
      // ...
    },
    "posts": [
      {
        "blog_name": "xavdid",
        "id": 54609944775,
        "post_url": "http://xavdid.tumblr.com/post/54609944775/freedom-day",
        "slug": "freedom-day",
        "type": "text",
        "date": "2013-07-04 18:02:22 GMT",
        "timestamp": 1372960942,
        "state": "published",
        "format": "markdown",
        // ...
        "title": "FREEDOM DAY",
        "body": "In the interest of eating as much grilled meat and pie as possible today, there's no new post. \n\nBut, get excited for the next couple of weeks, I have some great stuff written!",
        "reblog": {
          "tree_html": "",
          "comment": "<p>In the interest of eating as much grilled meat and pie as possible today, there's no new post. \n\nBut, get excited for the next couple of weeks, I have some great stuff written!</p>"
        },
        "trail": [
          {
            "blog": {
              "name": "xavdid",
              "active": true,
              "theme": {
                "avatar_shape": "square",
                "background_color": "#FAFAFA",
                "body_font": "Helvetica Neue",
                "header_bounds": 0,
                "header_image": "https://assets.tumblr.com/images/default_header/optica_pattern_06.png?_v=c5e9c9bdca5f67be80d91514a36509cc"
                // ...
              },
              "share_likes": false,
              "share_following": false,
              "can_be_followed": true
            },
            "post": {
              "id": "54609944775"
            },
            "content_raw": "<p>In the interest of eating as much grilled meat and pie as possible today, there's no new post. \n\nBut, get excited for the next couple of weeks, I have some great stuff written!</p>"
            // ...
          }
        ],
        "can_send_in_message": true,
        "can_like": true,
        "can_reblog": true,
        "display_avatar": true
      }
      // ...
    ]
  }
}
```

There's a lot of extra data there, so it's worth cleaning it it up a bit.

### (optional) Cleaning our Data

The tool for the job is [jq](https://stedolan.github.io/jq/) and it parses json into a specified format. We're going to tack the following line onto our `curl` command from before:

```bash
jq '[.response.posts[] | {body: .body, date: .date, title: .title, slug: .slug}]'
```

Let's unpack that command because it's rather dense.

- `.response.posts` grabs the value of the response and posts keys (that is, our array of posts). The `[]` at the end tell jq to iterate over the array (as opposed to using `.response.posts[0]` if we were only concerned with the most recent post).
- `|` works just like the unix pipe, sending the output of the last command into the next one.
- `{body: .body, date: .date, title: .title, slug: .slug}` instructs jq to iterate over the array and turn it into an object with the _body_, _date_, _title_, and _slug_ keys, which are really all we're concerned with. the `[]` that wrap the entire command specify that the output should be an array as well.

Put it all together and we've got concise json to convert.

```bash
curl 'https://api.tumblr.com/v2/blog/<BLOG_NAME>.tumblr.com/posts?api_key=<API_KEY>&filter=raw' | jq '[.response.posts[] | {body: .body, date: .date, title: .title, slug: .slug}]' > some_posts.json
```

This is much nicer:

```json
[
  {
    "slug": "i-am-a-post",
    "title": "I am a post",
    "date": "2015-09-16 00:04:22 GMT",
    "body": "This is the body of the [post](https://google.com) and so many people will eventually read it"
  },
  {
    "slug": "i-am-an-older-post",
    "title": "I am an older post",
    "date": "2015-07-03 00:14:22 GMT",
    "body": "I have some very important opinions I must share with you."
  }
]
```

Two quick notes on the options you can pass to tumblr:

- `filter` tells the API how to return your posts. I originally wrote in markdown, so I wanted to specify that I should get it out as well. You can see the full set of filters [here](https://www.tumblr.com/docs/en/api/v2#posts).
- the API only returns 20 posts at a time. To get more, add `&offset=<NUMBER (probably a multiple of 20)>` to your url. Luckily I had around 30, so I only needed to call it twice. Your experience may differ.

### Converting to Markdown

We've got this well formatted json, this is the easy part. This ruby script iterates through the posts, adds our [frontmatter](https://middlemanapp.com/basics/frontmatter/), and supplies the filename middleman expects(`2016-12-06-this-is-a-post.md`).

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

This is the body of the [post](https://google.com) and so many people will eventually read it
...
```

## That's All!

Boom! The result is a bunch of markdown posts that look a whole lot like [this](https://github.com/xavdid/xavdid.github.io). I checked my new files into git and deployed and now you're reading this.

Hopefully this has made the experience of exporting your tumblr archive fairly painless. There's a lot of options if your tumblr was more varied than my stack of text-only posts, but I bet you can handle it. If you've got questions, I'm available on Twitter ([@xavdid](https://www.twitter.com/xavdid)). Until next time!
