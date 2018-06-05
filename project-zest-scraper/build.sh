#!/usr/bin/env bash 
echo ""
echo "**********************************"
echo "**Builidng Docker container image*"
echo "**********************************"
docker build -f Dockerfile.n -t nicomalig/project-zest-scraper .

echo ""
echo "**********************************"
echo "********* Cleaning up ************"
echo "**********************************"
docker image prune -f