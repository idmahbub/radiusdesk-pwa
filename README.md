# Radiusdesk-pwa
Radius desk with pwa enbled, most pwerfull modern ui for hotspot management.

#Requirement
- ubuntu server *20.04 recomended
- Mysql/Mariadb
- Nginx/Apache
- Php7.4/Php7.4-fpm *newer

#Install
>sudo apt-get install php-cli php-mysql php-gd php-curl php-xml php-mbstring php-intl git wget

>cd /var/www

>git clone https://github.com/idmahbub/radiusdesk-pwa.git rd_code

>cd /var/www/html

>sudo ln -s ../rd_code/rd/build/production/Rd/ ./rd

>sudo ln -s ../rd_code/cake3 ./cake3

>sudo ln -s ../rd_code/login ./login

>sudo mkdir -p  /var/www/html/cake3/rd_cake/logs

>sudo mkdir -p /var/www/html/cake3/rd_cake/webroot/files/imagecache

>sudo mkdir -p /var/www/html/cake3/rd_cake/tmp

>sudo chown -R www-data. /var/www/html/cake3/rd_cake/tmp

>sudo chown -R www-data. /var/www/html/cake3/rd_cake/logs

>sudo chown -R www-data. /var/www/html/cake3/rd_cake/webroot/img/realms

>sudo chown -R www-data. /var/www/html/cake3/rd_cake/webroot/img/dynamic_details

>sudo chown -R www-data. /var/www/html/cake3/rd_cake/webroot/img/dynamic_photos

>sudo chown -R www-data. /var/www/html/cake3/rd_cake/webroot/img/access_providers

>sudo chown -R www-data. /var/www/html/cake3/rd_cake/webroot/img/nas

>sudo chown -R www-data. /var/www/html/cake3/rd_cake/webroot/files/imagecache

>sudo su

>mysql_tzinfo_to_sql /usr/share/zoneinfo | mysql -u root  mysql

>sudo su

>mysql -u root

>create database rd;

>GRANT ALL PRIVILEGES ON rd.* to 'rd'@'127.0.0.1' IDENTIFIED BY 'rd';

>GRANT ALL PRIVILEGES ON rd.* to 'rd'@'localhost' IDENTIFIED BY 'rd';

>exit;

>sudo mysql -u root rd < /var/www/html/cake3/rd_cake/setup/db/rd.sql

>sudo cp nginx/site-available/rd /etc/nginx/site-available 

>sudo nano /etc/nginx/site-available/rd #makesure, thedomain change valid !

>sudo ln -s /etc/nginx/site-available/rd /etc/nginx/site-enabled/

>sudo service nginx reload

>sudo apt-get install certbot

>sudo certbot --nginx -d example.com -d www.example.com #change with your domain

>sudo service nginx restart

>sudo cp -R /var/www/html/rd/* /var/www/html/

>sudo cp /var/www/html/cake3/rd_cake/setup/cron/cron3 /etc/cron.d/

#Introduction

Ubuntu 20.04 now comes with a FreeRADIUS 3.x release.
Install FreeRADIUS and MySQL module.

>sudo apt-get install libdatetime-perl

>sudo apt-get install freeradius freeradius-mysql

#Answer yes to install these with their dependencies
#Please note that when this package is installed there are some things generated that can take up lots of time on slower machines.
Enable and Start FreeRADIUS

>sudo systemctl enable freeradius

>sudo systemctl start freeradius

>sudo systemctl status freeradius

#Configuring FreeRADIUS version 3.x
Do the following to configure FreeRADIUS 3.x to work with RADIUSdesk
#Stop the service if it is already running
>sudo systemctl stop freeradius
#Backup the original FreeRADIUSdirectory
>sudo mv /etc/freeradius /etc/freeradius.orig
#Extract the RADIUSdesk modified FreeRADIUS directory
>sudo tar xzf /var/www/html/cake3/rd_cake/setup/radius/freeradius-3-radiusdesk.tar.gz --one-top-level=/etc/freeradius/

>sudo mv /etc/freeradius/freeradius /etc/freeradius/3.0

>sudo chown -R freerad. /etc/freeradius/3.0/

>sudo  mkdir /var/run/freeradius

>chown freerad. /var/run/freeradius


#Configure the site-wide shared secret. This will be the value used by ALL Dynamic Clients.

>sudo nano /etc/freeradius/3.0/sites-enabled/dynamic-clients

Look for this part in the file and change FreeRADIUS-Client-Secret to the value you choose to use.

#Echo the IP address of the client.
FreeRADIUS-Client-IP-Address = "%{Packet-Src-IP-Address}"
 
#require_message_authenticator
FreeRADIUS-Client-Require-MA = no
 
#secret
FreeRADIUS-Client-Secret = "testing123"
 
#shortname
FreeRADIUS-Client-Shortname = "%{Packet-Src-IP-Address}"
Comment out the following two lines in the Systemd unit file

>sudo nano /lib/systemd/system/freeradius.service

See this sample to see which two lines to comment out. Failing to do this will result in a broken system with FreeRADIUS not starting up during boot

>[Unit]
Description=FreeRADIUS multi-protocol policy server
After=syslog.target network.target
Documentation=man:radiusd(8) man:radiusd.conf(5) http://wiki.freeradius.org/ http://networkradius.com/doc/
 
>[Service]
Type=forking
PIDFile=/run/freeradius/freeradius.pid
#EnvironmentFile=-/etc/default/freeradius
#ExecStartPre=/usr/sbin/freeradius $FREERADIUS_OPTIONS -Cxm -lstdout
ExecStart=/usr/sbin/freeradius $FREERADIUS_OPTIONS
Restart=on-failure
RestartSec=5
 
>[Install]
WantedBy=multi-user.target
After you completed these commands you can test if FreeRADIUS starts up fine.
sudo systemctl daemon-reload 
sudo systemctl restart freeradius
sudo systemctl status freeradius

#Fixing a small bug

There is a small bug which prevents FreeRADIUS to start up after a reboot.

It has been reported here: https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=954911 There also seems to be a fix but it has not reached the Ubuntu repositories as of this writing. So here is the fix taken from the discussion in the link Create a file called /usr/lib/tmpfiles.d/freeradius.conf

>sudo nano  /usr/lib/tmpfiles.d/freeradius.conf

Add the following line

>d /run/freeradius 750 freerad freerad -

If you are curious about what we did, here is a writeup on tmpfiles.d
https://www.commandlinux.com/man-page/man5/tmpfiles.d.5.html
Add Nginx to run scripts
To create the ability for the web server to exercise some control over FreeRADIUS, we will have a custom script which is added to the sudoers file.
The correct way to edit the sudoers file is by using:

>sudo visudo

Add the following at the bottom

#Members of the admin group may gain root privileges

> %admin ALL=(ALL) ALL www-data ALL = NOPASSWD:/var/www/html/cake3/rd_cake/setup/scripts/radmin_wrapper.pl

Confirm that this line is now inside the /etc/sudoers file
> sudo cat /etc/sudoers
This will allow the root user in RADIUSdesk to Start and Stop FreeRADIUS service and do on-the-fly activation of debug traces.
