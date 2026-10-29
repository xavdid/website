# website

The code powering https://xavd.id!

Built with Astro

## Notes

- Some of the imported sass is marked as `is:global` and I'm not sure why
- Astro doesn't support gifs that are above a certain frame count, so big gifs have to live in the public folder
- on 2026-10-28 I did some eslint bumps, but the preact config didn't support eslint 10. so I had to pin to 9, which also forced eslint-astro package onto 1.x to solve deps
