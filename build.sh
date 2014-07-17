# run from project root (where it is)

bundle exec middleman build --clean
cd build
cp -r . ..
cd ..
rm -rf build
cd files
resume publish -t elegant

echo "Ready to push!"