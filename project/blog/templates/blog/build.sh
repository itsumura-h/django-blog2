#!/bin/bash

# service workerのindex.htmlをblogに置換
sed -i -e "s/index.html/blog/g" build/service-worker.js

# service-worker.jsを移動
rm ./build/static/service-worker.js
mv -f build/service-worker.js build/static/