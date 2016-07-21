#!/bin/bash -e

function logger()
{
    echo -e "\n### $1! ###"
}

function err()
{
    echo -e "\n!!! $1 !!!"
}

if [[ "$@*" == *-h* ]]; then
    echo -e "Build Script\nOptions:\n\t-h\t\tshow this help text\n\t-t\t\tpublish resume\n\t--no-tests\tbuild without tests\n\t-d\t\tdeploy to github"
    exit 0
fi

# clean up last build
# logger "Cleaning"
# ./clean.sh

# run from project root (where it is)
bundle exec middleman build # --clean

# test the build
# script will quit here if tests dont pass
# linkedin returns a 999 for a valid profile /shrug
if ! [[ "$@*" == *--no-test* ]]; then
    logger "Testing"
    bundle exec htmlproofer ./build --empty-alt-ignore --check-html --url-ignore "/lolapi,/stackpro,/refbook" --http-status-ignore 999 --file-ignore "./build/blog.html" --timeframe 24h --disable-external

    for f in source/posts/*; do
        if [[ $(cat "$f") !=  *"READMORE"* ]]; then
            err "\"$f\" doesn't have a READMORE"
            exit 1
        fi
    done
    logger "Tests Passed"
fi

# logger "Copying"
# cp -r build/* .
# rm -rf build

# run with the -r flag to push resume as well!
if [[ "$@*" == *-r* ]]; then
    cd files
    resume publish -t kendall
    logger "Publishing Resume"
fi

logger "Ready to push"
if [[ "$@*" == *-d* ]]; then
    logger "Pushing"
    middleman-deploy
fi
