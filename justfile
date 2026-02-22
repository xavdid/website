set quiet

# make installed binaries available at the top level
export PATH := "./node_modules/.bin:" + env('PATH')

_default:
	just --list

# run the dev server
dev:
	astro dev

# run the dev server
preview: build
	astro preview

# create a new blog post
post slug:
    mkdir -p "src/posts/{{ slug }}"
    cp misc/post-template.mdx.tmpl "src/posts/{{ slug }}/index.mdx"

# run syle checks
[no-exit-message]
lint-check:
    eslint src
    prettier --check src

# fix issues checks
[no-exit-message]
lint:
    eslint src --fix
    prettier src --write

# run pre-reqs for building
[no-exit-message]
typecheck:
    # this only checks .astro files, but not .ts
    astro check
    # so we do this instead
    tsc --noEmit

# all the pre-build checks
ci: typecheck lint-check

# do a production build
[no-exit-message]
build: ci
    just --version
    astro build
