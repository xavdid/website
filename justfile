set quiet

# make installed binaries available at the top level
export PATH := "./node_modules/.bin:" + env_var('PATH')

_default:
	just --list

# run the dev server
@dev:
	npx astro dev

# create a new blog post
post:
	./bin/new-post

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
