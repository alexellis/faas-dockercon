#!/bin/sh
echo Building functions/mobymingle:build

docker build --build-arg https_proxy=$https_proxy --build-arg http_proxy=$http_proxy \
    -t functions/mobymingle . -f Dockerfile.build

docker create --name render_extract functions/mobymingle
docker cp render_extract:/go/src/app/app ./app
docker rm -f render_extract

echo Building functions/mobymingle:latest
docker build --no-cache -t functions/mobymingle:latest .

echo Built functions/mobymingle:latest


