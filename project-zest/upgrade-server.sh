#!/usr/bin/env bash
echo ""
echo "**********************************"
echo "** Terminating previous instance *"
echo "**********************************"
docker rm -f zest-client

echo ""
echo "**********************************"
echo "** Pulling latest Docker image ***"
echo "**********************************"
docker pull nicomalig/project-zest-client-b1.0

echo ""
echo "**********************************"
echo "*** Relaunching new instance *****"
echo "**********************************"

docker run -d \
-p 80:80 \
--name zest-client \
nicomalig/project-zest-client-b1.0

echo ""
echo "**********************************"
echo "Complete Build, Deploy, Upgrade Revision 1.0"
echo "**********************************"