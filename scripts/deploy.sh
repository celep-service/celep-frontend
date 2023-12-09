#!/bin/bash
sudo cp -rf /home/ubuntu/celep-frontend/dist/* /var/www/html
timestamp=$(date +"%Y/%m/%d %H:%M")
echo "$timestamp> DEPLOY_JAR 배포" >> /home/ubuntu/deploy-front/deploy.log

