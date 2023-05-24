#!/bin/bash
set -e

build(){
#  npm run prebuild
 npm run build
 npm cache clean --force
}

_main(){
  echo "####### PRODUCTION ENTRYPOINT START #######"
  build
  echo "####### PRODUCTION ENTRYPOINT END #######"
}

_main
exec $@