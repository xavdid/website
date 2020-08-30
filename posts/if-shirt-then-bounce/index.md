---
date: "2014-02-12"
title: IF Shirt THEN Bounce That Email
fact: George Gershwin's Rhapsody in Blue received its premiere in a concert titled "An Experiment in Modern Music," in New York, with Gershwin playing the piano.
fact_year: 1924
tags: [automation, quidditch, ruby]
---

As you may or may not know, I'm one of the presidents of the highly ranked [Michigan Quidditch Team](http://michiganquidditch.com/). I've been with the team since the beginning and because I lived closest to the post office at the time, I've been in charge of shipping T-shirts to our fans all over the country. Until now, money has gone into my personal PayPal and I've just kept notes (usually of the [fetch](http://www.fetchnotes.com) variety) about which shirts I'd shipped and paid the team for. However, as my tenure with the team nears its end, we needed a more sustainable version of this system.

A few weeks ago I got _really_ into automating stuff with [IFTTT](https://ifttt.com). If you're not familiar, it's a services that connects accounts together and lets you automate actions between services. For example, you can sat set up recipes like IF I'm tagged in a photo on Facebook THEN download a copy of that photo to my Dropbox. Wouldn't it be cool if I could capture PapPal emails, parse them, and store that data in a database or spreadsheet?

Using the Email channel it's easy enough to capture purchase emails from PayPal, Unfortunately, there was no easy way to pull the content out of that email for use somewhere else. That's where this [middleware](https://github.com/captn3m0/ifttt-webhook) comes in. It functions as a fake Wordpress blog that IFTTT can send POST requests to, vastly opening up the realm of possibilities when it comes to where we can send our data. Now I could send a POST request with the plaintext (an IFTTT restriction) anywhere on the web.

Wanting to fiddle with [Sinatra](http://sinatrarb.com), the new toy I just learned about, I whipped together a quick [endpoint](https://gist.github.com/xavdid/8930419) that could accept a nice POST request and throw some regex parsing at it.[^1] From there, it uses my newly provisioned [Sendgrid](http://www.sendgrid.com) account to email IFTTT with a nicely formatted string that includes all of the relevant shirt info.

So to reiterate, here's the flow (and included IFTTT recipes):

1. Email arrives after someone purchases a shirt.
2. IFTTT uses [this](https://ifttt.com/recipes/145811-forward-paypal-emails-to-webapp) recipe to send the plaintext version of the email to the web app.[^2]
3. The app gets the data as a post request, parses out the address, email, name, and sizes.
4. It sticks that information into an email and sends it back to IFTTT with the subject being the spreadsheet row (`email ||| name ||| address ||| etc`) and the tag "#quid", triggering [this](https://ifttt.com/recipes/145812-put-quid-emails-into-a-spreadsheet) recipe.
5. You end up with a nice spreadsheet and it's easy to keep tabs on the whole process!

The nice thing is that even though I'll be leaving, this system is easy to replicate because of the portability of the IFTTT recipes. Plus, the app can keep filling a spreadsheet regardless of who's PayPal has been accepting the payments. This will hopefully help Michigan Quidditch continue on their path to greatness.

Oh, and you can see it in action at [shirtbounce.herokuapp.com](https://shirtbounce.herokuapp.com).

[^1]: This became harder than intended because the stripped HTML doesn't have any deliminators (it was written with the intent to use bolds or line breaks to separate content).
[^2]: It sends plaintext because the Wordpress hack sends your data as a post title (which can't have newlines). Stripped HTML doesn't have any newlines, so we get everything (albeit in a very jumbled state).
