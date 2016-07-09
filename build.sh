#!/bin/bash -ex

# run from project root (where it is)

bundle exec middleman build --clean
cp -r build/* .
rm -rf build

# run with the -r flag to push resume as well!
if [[ $* == *-r* ]]; then
    cd files
    resume publish -t kendall
fi

echo "Ready to push!"
