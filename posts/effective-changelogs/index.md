---
date: "2024-08-18"
title: "Effective Changelogs"
fact: "The Nineteenth Amendment to the United States Constitution is ratified, guaranteeing women's suffrage."
fact_year: 1920
tags: [programming]
og_desc: "Tips and tricks to write a changelog worth reading."
best_of: true
---

Like [your versioning scheme](/blog/post/versioning-as-communication/), your changelog is a vital and oft-overlooked method of communication to your users. Unfortunately, **it's easy to write a changelog, but hard to write a great one.**

The [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) project offers some good high-level guidelines, but speaking as someone who is frequently frustrated by changelogs, it seems like more specific advice is in order.

I've collected some simple tips and examples to ensure your changelogs are fit for human consumption.

<details>
<summary>Table of Contents</summary>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Nothing Beats a File](#nothing-beats-a-file)
- [Basic Formatting](#basic-formatting)
  - [Keep Headings Simple](#keep-headings-simple)
  - [Note the Date](#note-the-date)
  - [Be Iconic](#be-iconic)
- [Writing Style](#writing-style)
  - [Focus on Impact](#focus-on-impact)
  - [Give (Some) Context](#give-some-context)
  - [Don't Include Everything](#dont-include-everything)
- [A Full Example](#a-full-example)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

</details>

> Note: individual examples don't follow every guideline for brevity's sake. See [the full example](#a-full-example) for everything at once.

## Nothing Beats a File

If you only read one tip in this entire post, let it be this one: **Write a changelog file**. Not a GitHub release, not a page in your documentation; an actual file that gets distributed with your package.

I see a lot of projects that put changelog info into a GitHub release and call it a day. While convenient, GitHub releases have a few major problems:

- It's hard to jump to notes for a specific version; seeking backwards involves a _lot_ of clicking.
- No changelog information is included with a local install of your package.
- Tightly couples you to GitHub. Not only does it become harder to switch repo hosts, sometimes GitHub goes down (and with it a vital piece of project documentation).
- The date on a GH release is the day the record was created in GitHub. There's no way to backdate them, so if you don't create it right after your actual release, it'll forever be out of sync with the actual release date.
- Comparing notes across versions requires multiple tabs rather than a little scrolling.

A `CHANGELOG.md`, on the other hand:

- puts everything in a single, searchable place; nothing beats `cmd + f`
- ships with your package alongside the README
- is extremely portable

Creating GH releases and including the text from your changelog is totally fine. But make sure to use GH releases as secondary sources of information, not the primary one.

## Basic Formatting

### Keep Headings Simple

While it might be tempting to include information like dates or codenames in a release's top-level heading, avoid it. Include only the version string from your package manifest. This makes for easier visual scanning and deterministic markdown anchors.

❌ Extra info:

```md
## 1.2.3 - 2024-08-11

## 2024.03.01 - The Async Update

## My Package 4.5.6
```

✅ Just the version:

```md
## 1.2.3

## 2024.03.01

## 4.5.6
```

### Note the Date

Knowing how old a specific version is provides useful context about the release. For instance, it was released before a certain module convention was commonplace, or before certain language features were available.

Even if you use a versioning scheme that [includes the date](https://calver.org/), note the release date explicitly at the top of each release section. The exact syntax doesn't matter, but ISO format is recommended.

❌ No date, users have to use external resources:

```md
## 1.2.3

- some changes
- another change
```

✅ Front and center, easy to find:

```md
## 1.2.3

_released `2024-08-11`_

- some changes
- another change
```

Also, always list versions chronologically (no matter their major version line).

### Be Iconic

Changelogs can get lengthy, making them hard for readers to parse when skimming. Adding emoji to highlight certain sections or items helps readers visually identify different sections. For example:

❌ Block of changes, hard to know what to focus on:

```md
- Fixed a bug in `xyz()`
- The `abc` function has been removed
- Fixed a bug in `qwer()` where errors weren't always thrown correctly
- Some other changelog item
```

✅ Icons help themes pop:

```md
- 🐛 Fixed a bug in `xyz()`
- ❗ The `abc` function has been removed
- ⚠️ Fixed a bug in `qwer()` where errors weren't always thrown correctly
- Some other changelog item
```

Or, group changes under icon subheadings:

```md
- ❗ Breaking Changes
  - The `abc` function has been removed
  - The `def` arg in `blah` now throws an error
- ⚠️ Possible Breakages
  - Fixed a bug in `qwer()` where errors weren't always thrown correctly
- Other Changes
  - Some other changelog item
  - Fixed a bug in `xyz()`
```

## Writing Style

### Focus on Impact

Changelog items should focus on what changed, not why. This keeps each line focused and factual, ideal for a busy reader. If they're curious they can click through to the commit / pull request for the context behind the change.[^1]

❌ Too much context:

```md
- The UX of the `div_with_rem` function has always been confusing, so we've decided to separate it into two functions: `divide` and `remainder`. The former does integer division and the latter is a special version of the modulo operator that throws for negative values. This handles special cases where input was not validated (#567)
- We were also frustrated by the lack of distinct error classes, especially with regards to how users could catch those errors. That has been cleaned up in the latest release (#568)
```

✅ Brief and factual, with links to PRs (which have the required context):

```md
- replace `div` with `divide` and `remainder`; use them for integer division and positive modulo operations (#567)
- Split errors into distinct classes (#568)
```

### Give (Some) Context

Though the actual log of changes should be bullet points that link to PRs/commits, feel free to include text that gives context around the release. This is a good place to highlight top-level features, link to migration resources, or talk about future plans.

```md
## 2.0.0

Welcome to our big async release! While all functionality is still available synchronously, the new async functions should help with performance. We've also removed the options deprecated in [1.6.6](#166).

For migration information, see [the docs](https://example.com/blog/v1-v2-migration) and updated examples.

- added async versions of each of the core functions: `add_async`, `sub_async`, and `mul_async`
- removed the deprecated `is_imag ` argument for all math functions; it's replaced with `imaginary`

## 1.6.6

This release focuses mainly on consistency of our function args. Namely, the `is_imag` arg is now deprecated. Use `imaginary` instead. It also includes fixes before our big 2.0.0 later this year. Learn more about those plans on [the blog](https://example.com/blog/here-comes-v2).

- add `imaginary` arg to all functions
- fix for validating strings in `add`
```

### Don't Include Everything

There are many commits that aren't relevant to users of your package; things like docs updates, repo configuration changes, formatting, or misc typos. While these contributions are worth highlighting, they don't belong in a changelog.

Instead, focus on changes that impact the way your library is used: features, breaking changes, and bug fixes.

❌ Has every commit and PR, no matter the relevance:

```md
- update docs (#93)
- fix typo in docs (dd52a21)
- new CLI arg: `--parallel` for faster downloads (#95)
- improve phrasing in docstrings for `fancy` package (ac314e)
- fix bug with `add_one` function (#97)
- auto-update schema (#98)
- Bump `get-func-name` from `2.0.0` to `2.0.2` (#99)
```

✅ focuses on user-impacting changes:

```md
- new CLI arg: `--parallel` for faster downloads (#95)
- fix bug with `add_one` function (#97)
```

## A Full Example

This example follows basically all of my guidelines, optimizing for scannability and brevity. Feel free to adapt it to your own needs!

```md
# Changelog

This project adheres to [SemVer](https://semver.org/); the public API surface will not change outside major releases. The public API includes:

- all documented functions
- supported language versions
- import paths.

## 2.0.0

_released `2024-08-07`_

This is our big async release! We've made a host of changes ensuring the package spends less time blocking the main thread. You can read about it in our [blog post](https://example.com/blog/async)

- ❗**Breaking**: Remove function `do_the_thing()`. It's replaced by `do_thing_better()` (https://github.com/example/repo/pull/123)
- ❗**Breaking**: Drop support for Florp versions before 3.0 (https://github.com/example/repo/pull/456)
- Add new optional parameters to `has_some_args()` (https://github.com/example/repo/pull/789):
  - `explode` (boolean; defaults to `false`) triggers self-destruct after calling
  - `countdown` (int, seconds; defaults to `300`) controls the default timer
- add new function `very_cool_func()` to generate cool things (https://github.com/example/repo/pull/098)

## 1.3.5

_released `2024-07-01`_

- ⚠️ The `do_the_thing()` function is deprecated and will be removed in `2.0.0`. Use `do_thing_better()` instead (https://github.com/example/repo/pull/765)
- ⚠️ Fixed a bug in `qwer()` where errors weren't always thrown correctly. If you weren't validating input before, errors may start being thrown in places they weren't (https://github.com/example/repo/pull/432)
- added `some_neat_feature()` (https://github.com/example/repo/pull/101)

## 1.3.4

_released `2024-06-12`_

- update error text (https://github.com/example/repo/pull/234)
- improve performance of `was_slow_func()` (https://github.com/example/repo/pull/567)
```

[^1]: You _are_ writing detailed PR descriptions, right?
