#!/usr/bin/env bash

export LETSENCRYPT_EMAIL=nicomalig@gmail.com
export DNSNAME=api.project-zest.nicomalig.com

docker run --rm \
    -p 443:443 -p 80:80 --name letsencrypt \
    -v "/etc/letsencrypt:/etc/letsencrypt" \
    -v "/var/lib/letsencrypt:/var/lib/letsencrypt" \
    quay.io/letsencrypt/letsencrypt:latest \
    certonly -n -m $LETSENCRYPT_EMAIL -d $DNSNAME --standalone --agree-tos