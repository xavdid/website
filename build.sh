#!/bin/bash -e

if [[ $* == *-h* ]]; then
    echo -e "Build Script\nOptions:\n\t-h\t\tshow this help text\n\t-t\t\tpublish resume\n\t--no-tests\tbuild without tests\n"
    exit 0
fi

# clean up last build
./clean.sh

# run from project root (where it is)
bundle exec middleman build --clean

# test the build
# script will quit here if tests dont pass
# linkedin returns a 999 for a valid profile /shrug
if ! [[ $* == *--no-test* ]]; then
    bundle exec htmlproofer ./build --empty-alt-ignore --check-html --url-ignore "/lolapi,/stackpro,/refbook" --http-status-ignore 999 --file-ignore "./build/blog.html"
fi

cp -r build/* .
rm -rf build

# run with the -r flag to push resume as well!
if [[ $* == *-r* ]]; then
    cd files
    resume publish -t kendall
fi

echo "Ready to push!"
