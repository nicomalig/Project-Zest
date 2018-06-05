#!/usr/bin/env bash
echo ""
echo "**********************************"
echo "** Terminating previous instance *"
echo "**********************************"
docker network disconnect pzsnet project-zest-scraper
docker network disconnect pzsnet pzs-nginx
docker rm -f project-zest-scraper
docker rm -f pzs-nginx
docker network rm pzsnet

echo ""
echo "**********************************"
echo "** Pulling latest Docker image ***"
echo "**********************************"
docker pull nicomalig/project-zest-scraper
docker pull nicomalig/pzs-nginx

echo ""
echo "**********************************"
echo "*** Relaunching new instance *****"
echo "**********************************"

docker network create pzsnet

docker run -d \
-p 3210:3210 \
--network pzsnet \
--name project-zest-scraper \
nicomalig/project-zest-scraper

docker run -d \
-p 80:80 \
-p 443:443 \
-v /etc/letsencrypt:/etc/letsencrypt \
-v /usr/share/nginx/html:/usr/share/nginx/html \
--network pzsnet \
--name pzs-nginx \
nicomalig/pzs-nginx

echo ""
echo "**********************************"
echo "Complete Build, Deploy, Upgrade Revision 1.0"
echo "**********************************"