---
date: "2014-12-16"
title: Augmenting Automation on iOS With the Power of Python and Workflow
fact: Members of the Sons of Liberty disguised as Mohawk Indians dump hundreds of crates of tea into Boston harbor as a protest against the Tea Act.
fact_year: 1773
tags: [automation, deals, IFTTT, projects, Python, Shortcuts]
---

> AppShoppper. Launch Center Pro. IFTTT. Pythonista.

> Long ago, the four apps lived apart in harmony. Then, everything changed when iOS 8 was released. Only Workflow, master of all four apps, could help them.

[Workflow](https://workflow.is/) is a new iOS app that brings automater-like execution flows to your mobile device. You can take output from any action and chain it as input for another. Additionally, you can create iOS8 share sheets, allowing input to come from all over your phone. Previously, each of the aforementioned apps could do great thing (though only one thing at a time). Together, they're worth far more than the sum of their parts as Workflow brings all of their strengths together into one sleek automation machine.

For instance, we can get a push notification from [AppShopper.com](http://appshopper.com/) when an app we're watching goes on sale. Clicking the notification will trigger some python that tells us the regular and current prices, and on confirmation, send us over to that app in the store.

I'll go through each of the apps' setup here, or if you're cool enough that you're hip to them all already, just skip to the [instructions](#instructions) and you'll be on your way!

## The Nations

This workflow involves a chain of services, so I'll break them down in order of how you'll set them up.

### AppShopper.com (website; free account)

[AppShopper.com](http://appshopper.com/) scrapes the app store and keeps records for updates and sales. They offer emails when an app on your wishlist goes on sale, but we can do better than that.

Make an account and add a couple of wishlist items.

<!-- prettier-ignore -->
### Launch Center Pro ($5) [^1]

[Launch Center Pro](http://contrast.co/launch-center-pro/) ([App Store](https://itunes.apple.com/us/app/launch-center-pro/id532016360?mt=8)) is a handy app launcher that lets you trigger lots of other apps. Its real power comes from its ability to execute workflows, which really opens up the jobs you can kick off.

Go ahead and create a Launch Center Connect account so that you can plug into IFTTT.

### IFTTT (free)

[IFTTT](https://ifttt.com) ([App Store](https://itunes.apple.com/us/app/ifttt/id660944635?mt=8)) is an awesome service that chains together simple sets of instructions from different apps. You do this by activating channels (via OAuth). The one you'll want to start with is the [LCP](https://ifttt.com/launch_center) channel (and your _Connect_ account).

<!-- prettier-ignore -->
### Pythonista ($7)

<!-- prettier-ignore -->
I've written about Pythonista [before](/blog/post/pythonista-power-pack/) and still have nothing but good things to say about it. $7 seems steep for an app, but when you remember that it's a full python IDE with custom modules for interacting with your iOS device, that doesn't seem so steep anymore.

In terms of setup, you'll want to download [this](https://gist.github.com/xavdid/aad5332bfbfdf857d256) script into Pythonista. It pulls your AppShopper feed, grabs the most recent "price drop" post, and parses the sale info out of it.

## Operation Dealfinder <a name="instructions"></a>

Now that we're set to go, let's get to the awesome(r) stuff. Let's start from the top.

1. The lynchpin, of course, is Workflow. You'll want to download [this workflow](https://workflow.is/workflows/80d6f7808169407487abc646303be398) onto any device(s) that you'll want to be triggered. [^2]
2. IFTTT can hit Launch Center Pro to execute arbitrary URLs on your device. Conveniently, it can trigger workflows via iOS's url-scheme. So, use the following IFTTT recipe to run that workflow you just downloaded. Make sure to change the feed url to your personal wishlist! (note: recipe since deleted; sorry!)
3. When this recipe runs, you'll be treated to a notification like this: <br />![notification](./images/notification.png)
4. Upon clicking it, you'll see the workflow run, like so (click to pause, etc): <br /> ![workflow in motion](./images/ios.gif)
5. That's it! Support app developers by buying their stuff (even on discount)!

## The Takeaway

Workflow can chain together a surprising (and growing!) number of tasks that makes your life more awesome. With Pythonista, you're mostly only limited by your creativity (and a couple of system-level quirks that'll probably get worked out soonish).

If you're curious what Workflow is capable of, check out all of the Macstories [coverage](https://www.macstories.net/tag/workflow/).

So, go forth and make awesome things (and let me know how it goes [@xavdid](https://twitter.com/xavdid))!

<!-- prettier-ignore -->
[^1]: Frustratingly, there are separate launch center apps for iPhone and iPad. But, especially for $1 (on sale, as they are now), it's totally worth it.
[^2]: The reason I specifically pass `Nothing` into the pythonista script is that there's currently a bug where if anything is passed in, the script doesn't run. In theory, the workflow could be edited to pass in the url of the feed.
