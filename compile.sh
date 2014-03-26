bundle exec middleman build --clean
cd build
cp -r . ..
cd ..
rm -rf build
# I'll just commit/push it myself. 
# git add .
# git commit -m "$1"
# should only go if commit isn't aborted!
# git push