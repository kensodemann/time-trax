#!/bin/sh
#
tag="$1"
if [ ! "$tag" ]; then
  echo 'Usage: deploy.sh tag'
  echo 'NOTE: the specified tag should not exist yet'
  exit 1
fi

if [ `git tag -l "$tag"` ]; then
  echo "Error: tag $tag already exists"
  exit 1
fi

if [ `git branch | grep \* | cut -d ' ' -f2` != 'master' ]; then
  echo "Error: you are not currently on the master branch"
  exit 1
fi

echo "\nmodifying version..."
name=`adj-noun`

sed "s/versionName = .*/versionName = '$name';/" src/app/data/services/version/version.service.ts | \
   sed "s/versionTag = .*/versionTag = '$tag';/" > version.service.ts
mv version.service.ts src/app/data/services/version/version.service.ts

sed "s/\"version\": .*/\"version\": \"$tag\",/" package.json > package.json.new
mv package.json.new package.json

conventional-changelog -p angular -i CHANGELOG.md -s

echo "\ncommitting and tagging..."
git commit -am "chore: deploy version $tag"
git tag "$tag"

echo "\nbuilding..."
ng build --prod --base-href "/time-trax/"
cp dist/index.html dist/404.html

echo "\ndeploying..."
ngh --message="chore: deploy version $tag"

echo "\ncleaning up..."
git push -q
git push --tags -q
git checkout -q gh-pages
git pull -q
git checkout -q master

echo "\nDone."

exit 0
