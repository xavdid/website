#!/bin/bash -e

# cleans the generated files that have been moved up
# unfortunately, this is manual right now
# files this doesn't clear were put there manually

rm -rf build blog css img js files index.html blog.html misc.html projects.html tags.html calendar.html ./*.gz
