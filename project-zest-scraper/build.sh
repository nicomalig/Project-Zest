#!/usr/bin/env bash 
echo ""
echo "**********************************"
echo "**Builidng Docker container image*"
echo "**********************************"
docker build -t nicomalig/project-zest-scraper .

echo ""
echo "**********************************"
echo "********* Cleaning up ************"
echo "**********************************"
go clean
docker image prune -f