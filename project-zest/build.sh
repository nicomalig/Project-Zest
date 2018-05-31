#!/usr/bin/env bash 
echo ""
echo "**********************************"
echo "**Builidng Docker container image*"
echo "**********************************"
docker build -t nicomalig/project-zest-client-b1.0 .

echo ""
echo "**********************************"
echo "********* Cleaning up ************"
echo "**********************************"
docker image prune -f