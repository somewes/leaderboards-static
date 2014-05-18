#!/bin/sh
echo "Enter your sudo password to continue (Needed to bind to port 80)"
sudo nginx -p . -c nginx.conf
