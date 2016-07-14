---
title: Augmenting Automation on iOS With the Power of Python and Workflow
---

> AppShoppper. Launch Center Pro. IFTTT. Pythonista.

> Long ago, the four apps lived apart in harmony. Then, everything changed when iOS 8 was released. Only Workflow, master of all four apps, could help them.

[Workflow](https://workflow.is/) is a new iOS app that brings automater-like execution flows to your mobile device. You can take output from any action and chain it as input for another. Additionally, you can create iOS8 share sheets, allowing input to come from all over your phone.[^1] Previously, each of the aforementioned apps could do great thing (though only one thing at a time). Together, they're worth far more than the sum of their parts as Workflow brings all of their strengths together into one sleek automation machine.

READMORE

For instance, we can get a push notification from [AppShopper.com](http://appshopper.com/) when an app we're watching goes on sale. Clicking the notification will trigger some python that tells us the regular and current prices, and on confirmation, send us over to that app in the store.

I'll go through each of the apps' setup here, or if you're cool enough that you're hip to them all already, just skip to the [instructions](#instructions) and you'll be on your way!

## The Nations

This workflow involves a chain of services, so I'll break them down in order of how you'll set them up.

### AppShopper.com (website; free account)

[AppShopper.com](http://appshopper.com/) scrapes the app store and keeps records for updates and sales. They offer emails when an app on your wishlist goes on sale, but we can do better than that.

Make an account and add a couple of wishlist items.

### Launch Center Pro ($5) [^2]

[Launch Center Pro](http://contrast.co/launch-center-pro/) ([App Store](https://itunes.apple.com/us/app/launch-center-pro/id532016360?mt=8)) is a handy app launcher that lets you trigger lots of other apps. Its real power comes from its ability to execute workflows, which really opens up the jobs you can kick off.

Go ahead and create a Launch Center Connect account so that you can plug into IFTTT.

### IFTTT (free)

[IFTTT](https://ifttt.com) ([App Store](https://itunes.apple.com/us/app/ifttt/id660944635?mt=8)) is an awesome service that chains together simple sets of instructions from different apps. You do this by activating channels (via OAuth). The one you'll want to start with is the [LCP](https://ifttt.com/launch_center) channel (and your _Connect_ account).

### Pythonista ($7)

I've written about Pythonista [before](http://blog.davidbrownman.com/post/105811452344/pythonista-power-pack) and still have nothing but good things to say about it. $7 seems steep for an app, but when you remember that it's a full python IDE with custom modules for interacting with your iOS device, that doesn't seem so steep anymore.

In terms of setup, you'll want to download [this](https://gist.github.com/xavdid/aad5332bfbfdf857d256) script into Pythonista. It pulls your AppShopper feed, grabs the most recent "price drop" post, and parses the sale info out of it.

## Operation Dealfinder <a name="instructions"></a>

Now that we're set to go, let's get to the awesome(r) stuff. Let's start from the top.

1. The lynchpin, of course, is Workflow. You'll want to download [this workflow](https://workflow.is/workflows/80d6f7808169407487abc646303be398) onto any device(s) that you'll want to be triggered. [^3]
2. IFTTT can hit Launch Center Pro to execute arbitrary URLs on your device. Conveniently, it can trigger workflows via iOS's url-scheme. So, use the following IFTTT recipe to run that workflow you just downloaded. Make sure to change the feed url to your personal wishlist! <a href="https://ifttt.com/view_embed_recipe/232743-check-your-appshopper-feed-for-a-deal-and-send-you-there" target="_blank" class="embed_recipe embed_recipe-l_57" id="embed_recipe-232743"><img src="https://ifttt.com/recipe_embed_img/232743" alt="IFTTT Recipe: Check your AppShopper feed for a deal and send you there! connects feed to launch-center" width="370px" style="max-width:100%"></a><script async type="text/javascript" src="//ifttt.com/assets/embed_recipe.js"></script>
3. When this recipe runs, you'll be treated to a notification like this: <br><a href="http://imgur.com/F7Rp11U"><img src="http://i.imgur.com/F7Rp11U.png" title="source: imgur.com" height="400" alt="notification"></a>
4. Upon clicking it, you'll see the workflow run, like so (click to pause, etc): <br><img src="http://fat.gfycat.com/ConcreteSarcasticAnglerfish.gif" width="480" height="360" alt="workflow in motion">
5. That's it! Support app developers by buying their stuff (even on discount)!

## The Takeaway

Workflow can chain together a surprising (and growing!) number of tasks that makes your life more awesome. With Pythonista, you're mostly only limited by your creativity (and a couple of system-level quirks that'll probably get worked out soonish).

So, go forth and make awesome things (and let me know how it goes [@xavdid](https://twitter.com/xavdid))!

[^1]: For more information on how amazing Workflow is, check out Macstories' superb [article](http://www.macstories.net/reviews/workflow-review-integrated-automation-for-ios-8/) outlining some of the detailed features

[^2]: Frustratingly, there are separate launch center apps for iPhone and iPad. But, especially for $1 (on sale, as they are now), it's totally worth it.

[^3]: The reason I specifically pass `Nothing` into the pythonista script is that there's currently a bug where if anything is passed in, the script doesn't run. In theory, the workflow could be edited to pass in the url of the feed
