#!/usr/bin/env bash
echo ""
echo "**********************************"
echo "*** Calling ./build.sh ****"
echo "**********************************"
./build.sh

echo ""
echo "**********************************"
echo "**Pushing latest to Docker Hub ***"
echo "**********************************"
docker push nicomalig/project-zest-scraper

echo ""
echo "**********************************"
echo "******* Updating Droplet *********"
echo "**********************************"
ssh root@api.project-zest.nicomalig.com 'bash -s' < upgrade-server.sh