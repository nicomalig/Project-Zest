#!/usr/bin/env bash 
echo ""
echo "**********************************"
echo "**Builidng Docker container image*"
echo "**********************************"
docker build -f Dockerfile.ng -t nicomalig/pzs-nginx .

echo ""
echo "**********************************"
echo "********* Cleaning up ************"
echo "**********************************"
docker image prune -f