#!/bin/sh
#
tag="$1"
if [ ! "$tag" ]; then
  echo 'Usage: deploy.sh tag'
  echo 'NOTE: the specified tag should not exist yet, this script will create it'
  exit 1
fi

if [ `git tag -l "$tag"` ]; then
  echo "Error: tag $tag already exists"
  exit 1
fi

name=`adj-noun`

sed "s/versionName = .*/versionName = '$name';/" src/app/data/services/version/version.service.ts | \
   sed "s/versionTag = .*/versionTag = '$tag';/" > version.service.ts
mv version.service.ts src/app/data/services/version/version.service.ts

sed "s/\"version\": .*/\"version\": \"$tag\",/" package.json > package.json.new
mv package.json.new package.json

echo "\nstarting build..."
ng build --prod --base-href "/time-trax/"
cp dist/index.html dist/404.html

echo "\ndeploying to github.io..."
ngh --message="chore: deploy version $tag"

echo "\nDone. Verify the changes and if everything looks good, then:"
echo "\tgit commit -am \"chore: deploy version $tag\""
echo "\tgit push --tags"

exit 0
