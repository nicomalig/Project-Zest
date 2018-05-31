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
docker push nicomalig/project-zest-client-b1.0

echo ""
echo "**********************************"
echo "******* Updating Droplet *********"
echo "**********************************"
ssh root@159.65.76.173 'bash -s' < upgrade-server.sh

