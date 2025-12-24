set quiet

# make installed binaries available at the top level
export PATH := "./node_modules/.bin:" + env_var('PATH')

_default:
	just --list

# run the dev server
@dev:
	npx astro dev

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

# do a production build
[no-exit-message]
build: typecheck lint-check
    just --version
    astro build
