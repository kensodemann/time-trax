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

# TODO: script modifying the package.json and a version file, then commit those mods

git tag "$tag"
git push --tags

ng build --prod --base-href "/time-trax/"
cp dist/index.html dist/404.html
ngh --message="chore: deploy version $tag"

exit 0
