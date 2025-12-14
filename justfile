_default:
	just --list

# run the dev server
@dev:
	npx astro dev

# create a new blog post
post:
	./bin/new-post

lint:
	npx eslint src
