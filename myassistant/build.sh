#!/bin/sh

docker build --build-arg http_proxy=$http_proxy --build-arg https_proxy=$https_proxy -t alexellis2/faas-myassistant:19-4-2017 .

echo "Built alexellis2/faas-myassistant:19-4-2017"

