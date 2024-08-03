---
date: "2024-08-02"
title: "Versioning as Communication"
fact: "The first United States Census is conducted."
fact_year: 1790
tags: [programming]
og_desc: "Talking through why choosing a versioning scheme is of vital importance and why SemVer is the best option for most."
---

It's notoriously hard to communicate with existing users of a software package. When they were a new user, they skimmed (the first sentence of) your README before copying installation instructions. But in the years since, they haven't checked in at all.

While your blog posts and newsletters go unread, _every_ active user eventually reads a version number when upgrading their dependencies. That little string may be the only bit of new information they ever see from you, so it's important to make it count. Your choice of a [versioning scheme](https://nesbitt.io/2024/06/24/from-zerover-to-semver-a-comprehensive-list-of-versioning-schemes-in-open-source.html) informs what information users get:

- [SoloVer](https://beza1e1.tuxen.de/SoloVer) (or [ZenVer](https://github.com/NotAShelf/ZenVer/blob/main/spec/8.md)) says "something changed" with no further information
- [CalVer](https://calver.org/), says "something changed today and the last release was this long ago"
- [SemVer](https://semver.org/) says "something changed and this is how compatible the author thinks it is with the previous version"

Having released [versioned](https://github.com/xavdid/ruby-sdk/releases/tag/v1.0) [software](https://github.com/xavdid/heroku-config/releases/tag/v1.1.0) for [many](https://github.com/zapier/zapier-platform/commit/e7734d118cae8ff8b4052b55e724a3a439b2559c) [years](https://github.com/xavdid/universal-test-runner/releases/tag/v0.1.0), I find **SemVer** to be the best versioning approach for most projects. It puts the most important information front and center: how compatible a new version is with the one they're using. That's really all users care about during the upgrade process. Optimizing for upgradeability paves their path, ensuring they'll get to enjoy the hard work you've put into your project.

## No True SemVer

[Critics](https://hynek.me/articles/semver-will-not-save-you/) of SemVer assert that it only really works if authors adhere to it perfectly, which is hard to do. Sometimes authors deviate [on](https://github.com/jashkenas/underscore/issues/1805#issuecomment-53591058) [purpose](https://gist.github.com/jashkenas/cbd2b088e20279ae2c8e), but more often, breaks are accidental. Furthermore, critics say it's _impossible_ to understand all the ways your code is used in the wild and how compatible your changes will be.

![](https://imgs.xkcd.com/comics/workflow.png)

Therefore (the argument goes), if users can't trust SemVer to guide their upgrades and have to read changelog entries anyway, authors should use a different versioning scheme that doesn't bring a false sense of security.

### Issues Overblown

While SemVer mistakes certainly happen, there have been great strides in understanding [what makes](https://www.semver-ts.org/) a breaking change and [static analysis](https://github.com/obi1kenobi/cargo-semver-checks) to prevent mishaps. In any case, it's not worth letting perfect be the enemy of good.

Like I said, versioning schemes exists primarily as **communication tools**. If you don't use SemVer, your users need to read the changelog entry for _every single version_ they're upgrading between. That's a lot of work and most users will either:

- not read and upgrade anyway, or
- never upgrade

Neither of which is great! You've presumably improved your code over time and you want your users to reap those benefits.

By using SemVer, you give users a hint as to how closely they'll need to read the changelog; it's a starting place. If a change is technically a bugfix but will break a lot of users, you're free to upshift the release to a major version instead (a move explicitly allowed by the SemVer spec). This flexibility allows you to communicate via your versioning, which is exactly the goal here.

## Going Your Own Way

Though I think SemVer is the best choice, that shouldn't stop you if you think a different approach is best for your project. For instance, Typescript [does its own thing](https://github.com/microsoft/TypeScript/issues/14116) (which [Josh Goldberg](https://www.joshuakgoldberg.com/) explained in [more detail](https://www.learningtypescript.com/articles/why-typescript-doesnt-follow-strict-semantic-versioning)). The most important thing is to clearly communicate if and how breaking changes will happen (like [Django does](https://docs.djangoproject.com/en/dev/internals/release-process/#release-cadence)).

If you're doing your own thing, [this StackExchange answer](https://softwareengineering.stackexchange.com/a/440907) does a superb job outlining what you'll think through to pick a versioning scheme. Ultimately, it all boils down to **communication**. Do it early and do it often! Give your users the best chance at success.

> Big thanks to [Predrag](https://predr.ag/), [Evan](https://evanhahn.com/), and [Vicky](https://vickystein.media/) for their feedback on drafts and for helping me think through this post.

## Further Reading

There's been a lot of discussion on versioning across many years. Here are some of the sources I referenced while writing this (some of which is linked above):

- [This excellent episode](https://changelog.com/podcast/597) of the Changelog podcast (transcript included)
- [Semantic Versioning Will Not Save You](https://hynek.me/articles/semver-will-not-save-you/)
  - [HN thread](https://news.ycombinator.com/item?id=26314620)
- 2014 Underscore.js issue
  - [GH issue](https://github.com/jashkenas/underscore/issues/1805)
  - [Maintainer response](https://gist.github.com/jashkenas/cbd2b088e20279ae2c8e)
  - [HN thread](https://news.ycombinator.com/item?id=8244700)
- [SemVer for Typescript projects](https://www.semver-ts.org/)
- [cargo-semver-checks](https://github.com/obi1kenobi/cargo-semver-checks)
- [Choosing a SemVer alternative](https://softwareengineering.stackexchange.com/a/440907)
- [Rich Hickey keynote](https://youtu.be/oyLBGkS5ICk?t=1793) (specifically the section on SemVer, timestamped in the link)
