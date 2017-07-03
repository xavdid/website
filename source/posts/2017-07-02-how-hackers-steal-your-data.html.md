---
title: How Hackers Steal Your Data (and How to Make it Harder for Them)
fact:
fact_year:
tags: security
published: false
og_img: https://i.imgur.com/dy0G9UZ.png
og_desc: The ins and outs of password security
---

Your data is in constant danger.

If you use the internet at all (and you're reading this, I know you do), there are people out there that would happily sell access to your account to the highest bidder, forever compromising that password and any data associated with it. When you think of a hacker, you might think about [ridiculous scenes](https://www.reddit.com/r/itsaunixsystem/top/?sort=top&t=all) from movies. A shadowy figure's fingers fly over a keyboard in a poorly lit room as green text cascades down their four monitors. The reality of the situation is much more banal; programs run over the course of hours, breaking protected versions of passwords into their plain-text form. Once that's done, a hacker has unfettered access to any accounts they unlocked directly, plus anything else that reused that password. While nothing can keep you completely safe, you can make yourself as tough of a target as possible. To best understand this, let's take a journey through the steps of a typical hack, what makes it dangerous, and steps you can take to mitigate your risk.

## The Anatomy of a Hack

So here I am, a hacker. I'm looking to make a quick buck, so I'm going to spend my afternoon breaking into your account(s). Don't take it personally. Unless you're rich and/or famous, I'm probably not targeting you. In fact, I hardly know you exist; you're a line in a file. Rather than focus on specific people, I'm going to target accounts in bulk. I just [bought](https://www.theatlantic.com/technology/archive/2016/02/the-black-market-for-netflix-accounts/462321/) a dump of 400,000 passwords leaked from a forum hack a few years ago.[^1] I'm going to use a program that cracks each password and tests those credentials with other services. I can do this in quickly, for hundreds of accounts per second. So here's your first tip:

### 1. Don't reuse passwords

Large-scale password breaches happen with startling frequency. There's a great site called [HaveIBeenPwned](https://haveibeenpwned.com/) that maintains a list of all the services that have announced that they've been hacked. You can check whether or not your data has ever been compromised by inputting your email.[^2] Scary, huh? Even if you've gotten lucky and you've never been pwned, their [list of sites](https://haveibeenpwned.com/PwnedWebsites) is concerning. Your passwords are only as strong as the weakest site you use them on. It doesn't matter how good the security at Instagram is if you use the same password for say, your [Adobe](https://www.theguardian.com/technology/2013/nov/07/adobe-password-leak-can-check) account as well.

We're getting ahead of ourselves though. If you're lucky, I don't actually know your password yet. When I buy user data like this, at minimum, each entry will have an email and a password.[^3] The password can be stored in a number of ways. If the company is stupid, the password will be stored in plaintext, exactly how the user wrote it. Then I don't have to do any cracking at all - I just know your password. Let's hope for your sake, this isn't the case.

The more likely scenario is that your password will be **hashed** and **salted**. No, that's not a Waffle House hash brown order. Hashing and salting are techniques for making stored passwords more secure (and by extension, leaked passwords harder to crack).

A website needs to save your password in some form (to validate subsequent logins). Instead of storing the plaintext, most sites record your password with the help of a program called a **cryptographic hashing function**. There's a great writeup about how they work [here](http://www.unixwiz.net/techtips/iguide-crypto-hashes.html#howused), but the gist is that given your password as input, the function produces a **hash** with some special properties. Namely, the output is:

1. **deterministic**; the same input always gives the same output
2. **unique**; no two inputs should produce the same output
3. **irreversible**; there's no way to recover the input from the output

A service can store a hashed version of your password (such as `5f4dcc3b5aa765d61d8327deb882cf99`) and compare later login attempts against that string. On the surface, this is a great approach for securing data. I bought all these hashes, but because of rule 3 above, I have no *direct* way to turn them back into usable passwords. Unfortunately for you, I do have an *indirect* way.

It turns out most users are not very inventive when it comes to passwords. A recent [security report](https://blog.keepersecurity.com/2017/01/13/most-common-passwords-of-2016-research-study/) showed that of a sample of 10 million passwords leaked in 2016, a full 50% of them were among the 25 most commonly used passwords. Most of that list are keyboard patterns (like `123456` or `zxcvbnm`) or words straight out of the dictionary (like `password` or `google`). Given that so many people use such a small subset of passwords, it's well worth my time to build a [rainbow table](https://en.wikipedia.org/wiki/Rainbow_table), or a pre-computed list of hashes for the most common passwords (and their variants; `password1` isn't fooling anyone). So, if you use a common password you might as well just email me your bank account info now. In an effort to defeat rainbow tables, any service worth it's (*ahem*) salt will store your password with a bit of extra text at the front called a **salt**. For example, `salt+password1` hashes totally differently than `password1`. If the same salt is used for each password, I have to recreate my rainbow table. If a random salt is used with each password, I have to do them each separately, which definitely slows me down I've got (more) bad news for you though: it doesn't slow me down much.

Password strength is a common theme on Jeff Atwood's [Coding Horror](https://blog.codinghorror.com) and he's got a great piece on [passwords being too short](https://blog.codinghorror.com/your-password-is-too-damn-short/). Because of the speed of modern hardware, I can make trillions of guesses per second against your password. To do this, I'll build a list of the most common passwords, the ten thousand most common english words, and the most common transformations performed on each. If I think your password is `ilovedogs`, you bet your butt I'm going to have [a program](https://en.wikipedia.org/wiki/John_the_Ripper) that tries things like `ilovedogs95` and `1l0v3d0gs`. This is called This is **password fuzzing**, and is the basis for a well-known [xkcd comic](https://xkcd.com/936/). If your password is in (or based on a word in) the list that I start with, you're hosed.

![https://xkcd.com/936/](https://imgs.xkcd.com/comics/password_strength.png)

The comic also touches on another key factor in password security: **length** (it matters). If your passwords is 8 characters or less, it takes at *max* 1 minute to guess (and that's only if you've got letters, numbers, etc. To ensure I can't crack yours, make sure any password you use has at least one of each type of character and is 12 characters, *minimum* (and more is strictly better). Passwords like that are basically impossible to remember though, especially if you're making a new one for each account (as you should be). That's where tip number 2 comes in:

### 2. Use a password manager

If you want to keep me out, you need to have long, unique passwords for every site. There's no reasonable way to expect you to remember these without some help, but help is here. Password managers are a class of software that perform two main functions for passwords: generation and storage.

![password generation](https://i.imgur.com/FR5ArUX.png)

At this point, all of my site passwords are random 20+ character strings with a few of each character type. Much like my friends' phone numbers, I don't know any of my passwords, I just know how to find them. Better yet, according to the [GRC calculator](https://www.grc.com/haystack.htm) that Atwood linked to in his post, any one of my passwords would take *9.38 hundred billion trillion centuries* to crack (which I'm not even totally sure is a real number). I personally use [1Password](https://1password.com/) and have found it to have the best balance of security, price, and features.[^4] App recommendation site *The Sweet Setup* [agrees](http://thesweetsetup.com/apps/best-password-manager-and-why-you-need-one/) with my assessment and recommends a few others in case you don't.

As I'm going through the passwords in my hypothetical hack scenario, I'm going to try each of the 1 million items in my starting list. More than likely, that approach will crack half of the passwords without any effort and I won't bother moving onto the hard ones. As a responsible internet user, it's in your best interest to take all actions possible to plant yourself firmly in that second camp. Using a password manager correctly is the easiest way to do this.

So now you've got super secure passwords! Good for you. Unfortunately, you're still not totally safe (a recurring theme). What if the worst happens, and your password is leaked in plaintext? Then it doesn't matter how strong or weak your passwords are; you're vulnerable from the time the system is breached until the site resets your password. In the meantime, you can protect yourself by requiring a second factor be present to log into your account. Tip the third:

### 3. Use 2 Factor Authentication

While authenticating online normally only requires something you *know* (your password), **2 Factor Authentication** adds the requirement of something you *have*. A real-world example of this is unlocking your house. To open the door, an attacker needs both something you *know* (your address) and something you *have* (your key). Even if I know your key, I can't get into your house without having your key. 2FA adds a similar level of protection to your online accounts. In addition to your password, someone hoping to log in as you needs an extra piece of information, typically tied to a physical device.

![authy](https://i.imgur.com/kfH3X5r.png)

The most common form of 2FA is a 6 digit code that rotates every 30 seconds, known as a [Time-based One-time Password](https://en.wikipedia.org/wiki/Time-based_One-time_Password_Algorithm) (pictured). Your phone and the server agree on a shared secret during setup, so only a device that knows this secret will be able to generate the correct code. This is a great approach, as I need physical access to a device with your codes on it to break into that account.[^5] This method is also great when paired with Touch ID on Apple devices. Unless you've got my phone in your hand and my thumb on that hand, my password isn't enough to get you into my account. There are a lot of good options for 2FA apps, namely [Google Authenticator](https://support.google.com/accounts/answer/1066447?hl=en&co=GENIE.Platform%3DiOS&oco=0) (more secure) and [Authy](https://authy.com/) (more convenient, but still pretty secure).

If you want to go the extra step (say, for your central gmail account that secures all others), you might invest in a [UTF security key](https://smile.amazon.com/Yubico-Y-123-FIDO-U2F-Security/dp/B00NLKA0D8?sa-no-redirect=1) for ~$18. Once attached to an account it acts as a second factor, verifying that the person logging in is the one holding the physical key. Right now it has the major downside of being desktop-only (unless you have a certain Android phone), but justifies that being the absolute most secure option on the market. If you're interested in adding it to Google, there's a great walkthrough [here](https://techsolidarity.org/resources/security_key_gmail.htm).

As you're looking for the 2FA solution that fits you best, remember to **avoid SMS**. This [FAQ](https://techsolidarity.org/resources/security_key_faq.htm) goes into detail about the vulnerability of text-message based 2FA:

> Many sites encourage you to add your phone number to secure your account. But there are at least three reasons why you should avoid using text messages for two-factor authentication.
>
> 1. Your phone number can be easily hijacked by someone who calls the phone company and pretends to be you.
> 2. The text message can be viewed or redirected while en route to your phone.
> 3. Many phones are configured to display text messages on the lock screen.
>
> If text messages are the only way to add two-factor authentication to your account, they are better than nothing. But if you can use an alternative method, like an authenticator app or a security key, use that instead.

While a targeted vector like [sim hijacking](https://motherboard.vice.com/en_us/article/mg7bd4/how-a-hacker-can-take-over-your-life-by-hijacking-your-phone-number) is separate from the bulk-based attack we've been stepping through, it's definitely something to be wary of. Whichever method(s) you use, it will make you basically impervious to the attack described in this article.

"So... is that it?", you might be thinking. "If I have good, unique passwords and use 2FA wherever I can, I'll always be safe forever?"

I've got some more bad news.

## You're Not Quite Out of the Woods... Yet

The hack described here (a large-scale brute forcing of hashed passwords) is a common attack vector, but it's not the only one. The single best way to keep yourself safe is **constant vigilance**. Be overly cautious in all things. To that end, I've got two last bonus tip to send you off with.

![CONSTANT VIGILANCE](http://misszoot.com/wp-content/uploads/2015/10/constantvigilance.png)

### 4. Use HTTPS, Everywhere

Accessing the internet without using `https` is like shouting everything you type as you do so. Anyone who's close enough to hear can if they're paying attention. If you're uncomfortable with anyone knowing your passwords, payment info, and any other sensitive information, make sure you only access sites that include `https://` at the start of their name. The "s" stands for "secure" and means any data you send to the site is encrypted, safe from any prying eyes. A some sites do this by default. A lot more support it, but don't enforce it. The Electronic Frontier Foundation has a great [browser extension](https://www.eff.org/https-everywhere) appropriately called **HTTPS Everywhere** that will redirect you to a secure version of a page if it's available. It's easy to install and forget about, and I recommend you do exactly that.

### 5. Update Your Computer

Annoying though they may be, operating system updates are *vital* to keeping your hardware secure. The most recent example is the [WannaCry ransomware](), which used known vulnerabilities in Windows 7 to forcibly encrypt over 230,000 computers in 150 countries. These types of attacks are totally preventable, but only if you've installed the security patch that fixed it. Apple products aren't totally safe either. Apple recently [fixed](https://support.apple.com/en-us/HT207797) set a set of vulnerabilities across their operating systems (though they weren't widely exploited, if at all). Once issues are fixed, attackers have a much narrower range of what vulnerabilities exist in un-updated systems and the race begins. As long as you're up-to-date every 24 hours or so, you *should* be safe enough, but it's never too soon to download a security update.

Listen, I get it. Your computer always prompts you when you're in the middle of something and you don't want to break the flow. Wait until the end of the day, or set your computer to apply the update overnight. Just please, *please* don't leave them for months or years. The only person you hurt is yourself.

## You Can See Clearly Now

While nothing is 100% in internet security, you owe it to yourself to become as aggravating of a target as possible. If you're interested in reading more, I recommend [decentsecurity.com](https://decentsecurity.com/#/introduction/), this great [security muiltireddit](https://www.reddit.com/user/Kalabaster/m/supasec/), and generally lurking on [Hacker News](https://news.ycombinator.com/).

Past that, I appreciate you reading this far. I've done by best to make a fairly technical subject approachable. Definitely reach out with questions, suggestions, or thoughts. Until then, good luck!

[^1]: Hacks happen all the time, and companies are not always prompt about announcing that it's happened. Just because you haven't heard of a break doesn't automatically mean your data is safe.
[^2]: Normally putting your email into a site that talks about hacking isn't a great idea. On the surface, it feels like supplying your full credit card to see if anyone else has it. In this case, HIBP is a reputable site run by a [security researcher](https://www.troyhunt.com/about/) and you can act without fear.
[^3]: If you're unlucky, I've got phone numbers, birthdays, and/or and location information. If you're extra unlucky, there could be SSN data there as well.
[^4]: I used to use LastPass, but the repeated [security issues](https://blog.lastpass.com/2017/03/important-security-updates-for-our-users.html/) drove me away. The LP team did a great job fixing these quickly, but I didn't want the inevitable next vulnerability to be exploited before they responded to it.
[^5]: There's a narrow exception where you can still get phished while using TOTP. If an attacker can capture your password and token, they have the full 30 second window to use them to compromise this account. This attack is explored in the [Reply All podcast](https://gimletmedia.com/episode/97-what-kind-of-idiot-gets-phished/). For the purposes of prevent a brute force attack as described here, TOTP is more than sufficient.
