---
title: Pythonista Power Pack
fact: Arthur Wynne's "word-cross", the first crossword puzzle, is published in the New York World.
fact_year: 1913
tags: iOS, python, Dropbox, Pythonista, Workflow
---

[Pythonista](http://omz-software.com/pythonista/) is an amazing iOS app that brings the power of a python IDE to your iPhone, complete with an interpreter and a set of custom-made modules for interacting with the phone's ecosystem (contacts, clipboard, [etc](http://omz-software.com/pythonista/docs/ios/)). It's powerful out of the box, but there are some easy improvements that you can make so that development really is a breeze, namely the ability to download public gists and Dropbox syncing. Both are pretty straightforward and require minimal coding expertise (but of course, that doesn't bother you. You're still reading this, after all).

READMORE

## Downloading Gists <a name="workflow"></a>
Github [gists](https://gist.github.com/) are a great way to share bits of code into the Github ecosystem without creating an entire repo. The neatest thing is- they still exist as a repo and can handle revisions, forking, and comments. When you're working with Pythonista, it's great to have the ability to quickly copy those snippets into the app. Luckily, the app's creator has created such a [gist](https://gist.github.com/omz/b0644f5ed1d94bd32805).

To further streamline gist downloads, you can use the new [workflow](https://workflow.is/) app and download [this](https://workflow.is/workflows/59bb35df6c074edea6e9e92abd7e1444) workflow. Then, you can just your new share tab in your mobile browser of choice to send the url into that gist and boom!

Here's the workflow in action:

![workflow](https://giant.gfycat.com/UnluckyMisguidedHalcyon.gif)

[Gfycat link](https://gfycat.com/UnluckyMisguidedHalcyon)(for slow/pause/reverse)

## Dropbox Sync
For what is probably an apple-imposed restriction, Pythonista doesn't share Editorial's built in Dropbox sync. Fortunately, it's easy enough to fix this with the power of Python. There are a couple of easy steps to follow first.

### Create an App

Go to [dropbox.com/developers/apps](https://www.dropbox.com/developers/apps) and create a new app.

![dropbox app](https://i.imgur.com/vzP82jB.png)

Make sure your settings match mine (Dropbox API app, files+datastores, Yes), give your app a name (this is the default name for your sync folder, but you can change it client-side later), and hit create!

This will bring you to a settings page for your app, on which you __don't__ need to change anything. Leave it open for now and we'll revisit it in a sec.

### Download the Dropbox Sync Script

David Hutchison has written an awesome [gist](https://gist.github.com/dhutchison/b527e2a9e855437539c9) that syncs all the files in the Pythonista directory via an approved app. So, download this gist (if only there was an [easy way to do that](#workflow)) and edit lines 14 & 15 to use your app's key and secret (found on your settings page from before).

### Initial Sync!

Running for the first time, you'll authenticate, and the script will create a folder in your dropbox and put anything that's in your Pythonista root into it. It also creates a sync folder (the aptly named `dropbox_sync`) with your access token and a text file that acts as a record of what versions it should prioritize. That way, it doesn't rewrite when it shouldn't and knows which version is more current. You won't need to touch this folder.

## Blast off!

That's all! Now, you can just run that script (or create an action in the app that does it for you) and your app will have updated versions of everything. In case things go sour, the script lets you choose what to keep or overwrite and does it well.

Now that you've got a better dev environment set up in Pythonista, you're ready to browse the world of code and take on more adventurous projects. Happy hacking!
