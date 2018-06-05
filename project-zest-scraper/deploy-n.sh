#!/usr/bin/env bash
echo ""
echo "**********************************"
echo "*** Calling ./build.sh ****"
echo "**********************************"
./build-n.sh

echo ""
echo "**********************************"
echo "**Pushing latest to Docker Hub ***"
echo "**********************************"
docker push nicomalig/pzs-nginx

echo ""
echo "**********************************"
echo "******* Updating Droplet *********"
echo "**********************************"
ssh root@api.project-zest.nicomalig.com 'bash -s' < upgrade-server.sh

