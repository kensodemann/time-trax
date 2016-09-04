#!/bin/bash

for file in `find node_modules/@angular2-material -name '*.js'`; do
  sed -i .bak -e '/sourceMappingURL.*\.js\.map/d' $file
done

for file in `find node_modules/h5webstorage -name '*.js'`; do
  sed -i .bak -e '/sourceMappingURL.*\.js\.map/d' $file
done
