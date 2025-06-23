---
date: "2025-06-18"
title: "My Backup Strategy (and how to build your own)"
fact: "Susan B. Anthony is fined $100 for attempting to vote in the 1872 presidential election."
fact_year: 1873
tags: [personal]
og_desc: "I don't back up my laptop; here's what I do instead."
---

I don't back up my laptop. Not via [Time Machine](https://support.apple.com/en-us/104984), nor via [Backblaze](https://www.backblaze.com/). Some of my files _only_ exist on my machine. Don't worry, it's not as bad as it sounds.

Ever since I've had a decent set of [dotfiles](https://github.com/xavdid/dotfiles), I've treated my laptops as ephemeral. Not disposable; I keep my hardware a long time. Just that I just assume my laptop could get [struck by lightning](/blog/post/thunderbolts-and-lightning/) at any moment.

I've always found maintaining full backups the "right" way to be more trouble than it's worth. Backup programs can be resource hogs, you need a big external drive, and external backups can be expensive.

Instead, I wanted to set up a system to back up _only_ the things I cared about as easily as possible. I considered:

- what data I cared about
- where it lived
- and what would have to happen for me to lose access to it

Those questions answered, I designed a simple yet robust backup solution for myself. My approach won't work for everyone (or maybe anyone) but hearing about my thought process may help you build a solution of your own.

## First, the clouds

My most important digital data lives across the clouds of the tech giants.[^1] I care about five main categories:

1. All of my **code** projects live on Microsoft's GitHub
2. **Email** records & receipts are in Google's Gmail
3. Miscellaneous **structured information** in Airtable (including all of the data powering [david.reviews](https://david.reviews))
4. My Obsidian vault, full of **notes**
5. Years of **photos** have been uploaded to in Apple's iCloud
6. Anything else (legal **documents**, old writing, purchased music & books, backups of the other categories, etc) is archived into Dropbox

In an age of digital impermanence, trusting these big corporations may seem like an odd choice. Love them or hate them, none of the aforementioned companies are likely to disappear overnight. They each employ teams of people responsible for data integrity and backing up all their backups (much more thoroughly than I ever could). It's possible they could lose or corrupt things, but let's assume they won't.

Instead, the most likely point of failure would be losing access to those accounts. Any of those companies can decline to continue doing business with you for any reason, at any time. Each account is _unlikely_ to get closed (much less all of them) but planning for the unexpected is the whole point of this exercise.

Let's back them each up in turn.

## GitHub

My corpus of code is arguably my most important category. It basically my life's work, spanning every project, blog post, website, and tool I've ever made outside of my job.

Backing it up has always been tricky. Each folder includes a bunch of installed dependencies (something something [node_modules](https://i.imgur.com/lrgCHVu.jpeg)), compiled project output, and `.env` files that **shouldn't** be included in backups. Ultimately, I just want to retain access to the code that's been uploaded to GitHub: unbuilt source, no secrets. So... exactly what you'd get on a fresh clone of each repo.

To facilitate this, I wrote a little [bash script](https://github.com/xavdid/dotfiles/blob/03a852d7f9e1bf0b287b736f1a4a06ceedcccff2/bin/backup-github) that:

- Gets a list of every repo (public & private) I've got on GitHub using the `gh` [CLI](https://cli.github.com/)
- For each of those repos, does a `git clone / pull` as necessary
- Zips that root folder into a 1.2GB archive that's easy to throw into Dropbox for safekeeping [^2]

GH also has a [backup tool](https://docs.github.com/en/get-started/archiving-your-github-personal-account-and-public-repositories/requesting-an-archive-of-your-personal-accounts-data) (which I occasionally use as well), but my solution is quick, clean, and scriptable.

### Project credentials

For a long time, I got by on reading environment variables from active deploys any time I lost track of one. That mostly worked, but it's incredibly fragile and doesn't help me if I forget where I've deployed something.

Instead, I've got a [1Password](https://1password.com/) note corresponding to each project. It's got the entire `.env` file, plus anything that's not fit for the project's README. Duplicating the data means my 1P is occasionally stale, but those values don't change often so it hasn't come up much.

Another option would be to lean more heavily on the 1P CLI. It can make the [contents of a note available](https://developer.1password.com/docs/cli/secrets-scripts/) in a project's environment, meaning 1P could act as the source of truth for local dev. But that's coupling me pretty heavily to 1P for projects that only need light configuration. Plus, the 1P CLI [doesn't work offline](https://www.1password.community/discussions/developers/cli-offline-mode/88158) yet, which is a non-starter.

To import all my `.env` files into 1Password, I ran the this bash script as a one-off:

```shell
 rg --files --glob '**/.env*' \
    --glob '!**/node_modules/**' \
    --glob '!go*' \
    --glob '!github-archive*' \
    --glob '!**/.env.example' \
    | while read -r file; do
        op item create \
            --category="Secure Note" \
            --title="$file" \
            --tags=".env" \
            "notesPlain[text]=$(<$file)" \
            </dev/null
     done
```

It finds all `.env` files and creates 1P items out of the contents, ignoring especially deep directories for performance reasons (like the aforementioned `node_modules` and the big archive folder from the [previous step](#github)).

## Gmail

I mostly lean on Google's own [Takeout](https://takeout.google.com) tool here. More than 15 years of emails is a powerful archive and they give it all to you in a portable, useful format. Once I've exported the files (which I do manually ~ twice / year), I put them in Dropbox.

## Airtable

As I was making a list of my most important data, [Airtable](https://www.airtable.com/) came in surprisingly high on the list. It underpins most of the serious organization in my life. It's the sole database for my [media reviews](https://david.reviews), my mood journal, our holiday card address list [^3], and the serial numbers for every piece of hardware in our house. Silly as it may sound, losing it all would be devastating.

If the worst happened, I'd need a way to recreate everything. That means backing up both the schemas and all of the data. Luckily, both of those are available via Airtable's [web API](https://airtable.com/developers/web/api/introduction). I ended up making a small [Python package](https://github.com/xavdid/backup-airtable) that dumps everything I need into (very compressible) JSON. I've got [another bash script](https://github.com/xavdid/dotfiles/blob/03a852d7f9e1bf0b287b736f1a4a06ceedcccff2/bin/backup-airtable) that runs the backup script, zips it all into a svelte 6MB and drop it into, you guessed it, Dropbox.

## Obsidian

My [Obsidian vault](/blog/post/how-i-obsidian/) already lives in Dropbox on my computer, so it wouldn't disappear immediately if my computer dies. Nevertheless, I've got a [little shell script](https://github.com/xavdid/dotfiles/blob/03a852d7f9e1bf0b287b736f1a4a06ceedcccff2/system/aliases.zsh#L41-L45) to zip up the whole thing and add it to my backup pile in Dropbox so I'm not constantly editing the _only_ copy.

## Photos

Photos are tough. On the one hand, they're irreplaceable; I can't re-code them or find them in an email archive (like I could with a project or important document I was sent). On the other hand, they take up more space than any other category I care about (roughly 100GB).

I occasionally copy my `.photoslibrary` file into Dropbox, but that's about as far as I go. Guaranteeing I never lose any photos is a laborious process that hasn't been worth the effort for me, so far.

That's definitely a personal preference though (and one that may change in the future). There are lots of ways to back these up for real. ATP had a good [member special](https://atp.fm/atp-insider-photo-workflows) about it if you want _way_ more information.

## Dropbox

Every other file on my computer is put somewhere into my Dropbox folder hierarchy. That's any important document (taxes, housing, etc), DRM-free media purchases, everything. If it's elsewhere on my computer, I assume it's ephemeral (like something I've downloaded and will soon delete).

This gets thing off my laptop as a primary storage device, which brings a lot of piece of mind.

> An aside: I've got a lot of feelings about Dropbox and the disdain they seem to have their customers (who can _literally_ never pay enough). But they have the best combination of features, price, and ease of use. It's the worst option available (except for all the others).

## Cold storage

Careful readers will notice that each of the above steps ends in Dropbox, which is a lot of eggs for one basket. If something happens to that account, I'd lose all my documents, plus all of my other backups. Not ideal!

To back up the backups, I prepare a flash drive each calendar quarter. It's got an [encrypted disk image](https://support.apple.com/guide/disk-utility/create-a-disk-image-dskutl11888/mac) with everything I'd need to restart if I lost every computer and account all at once (a vanishingly unlikely occurrence in the first place).

Because it's my emergency last-resort case, everything about this drive is designed for maximum compatibility:

- [The drive](https://www.amazon.com/dp/B07YYJRXQR) supports both USB A & C, so I'll be able to use it regardless of what hardware I have available
- The disk image is formatted as `ExFAT` so it'll work on any operating system
- The password is stored in my 1Password and is lengthy but memorable. I manually type it when updating the drive so I know I've got it memorized (in case I don't have 1P access later)

On that drive is:

- the latest version of each of the zips mentioned above (plus a few more, like [Things3](https://culturedcode.com/things/) and [BGStats](https://www.bgstatsapp.com/))
- my 1Password [emergency kit](https://support.1password.com/emergency-kit/)
- the most important documents & media (tax history, home ownership, favorite music)

Twice a year, I leave that quarter's drive at my parents' house out of state. It would be slow to retrieve if I really needed it, but they'd likely be isolated from any major Californian disaster. For the other two quarters, I leave the same flash drive at my in-laws, who live near by. Easier to get to if needed, but susceptible to the same natural disasters our house is (but still safe from more localized issues, like a flood or house fire).

In either case, retrieved backup data would be a few months stale, but it would be way better than nothing.

## What works for me

Everything I described above is what works for me based on the data I care the most about. It's a good balance of convenience and reliability, ensuring it's basically impossible to totally lose something. All it costs is running a few CLI commands on a schedule and $45 worth of flash drives.

With this system in place, all of the following would need to happen simultaneously before I'd permanently lose any data:

- I'd have to lose access to my Google / Apple / GitHub / etc account
- I'd _also_ need to lose my Dropbox account
- Multiple houses would have to burn down

So I feel pretty good about my odds of not losing things.

## What works for you?

Your plan may look like mine (but probably doesn't). There will always be tradeoffs between effort, price, retrieval speed, and robustness, so do what makes sense for you. Really, all that matters is that you have _a_ plan. Your plan might be as simple as a paid backup service ([Wirecutter](https://www.nytimes.com/wirecutter/reviews/best-online-backup-service/) recommends a few) or the software that comes with your OS.

To start forming your backup strategy:

1. Think about the digital data in your life you'd be upset to lose. Where does it live?
2. How likely are you to lose access to the account / hardware where the live copy of that data lives?
3. Does anything live _only_ on your computer? If it was thrown in a lake, what couldn't you replace?
4. What if your house burns down? What gets lost then?
5. And lastly, what step(s) are worth their time/money to mitigiate some of the above situations?

It's not a hard exercise, but it's one that's worth doing before you really need it. Afterwards, it may be too late.

[^1]: One of those phrases that sounds cool if you don't know what it means, like "waterboarding in Guantanamo bay".
[^2]: The vast majority of the space is a few repos with a lot of images. They're counted twice (the original and the `.git` copy), but it's not super big overall. I should probably look into git-lfs, but the size is manageable for now.
[^3]: If you're not on that list and want to be, let me know!
