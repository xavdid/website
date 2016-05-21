#!/bin/bash -ex

# run from project root (where it is)

bundle exec middleman build --clean
cd build
cp -r . ..
cd ..
rm -rf build

# This can probably be done manually because it won't change often. 
# resume publish -t kendall

echo "Ready to push!"
