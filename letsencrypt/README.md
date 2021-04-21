[![Mikrotik RouterOS](https://hsto.org/webt/mg/mo/7b/mgmo7bqmpjknknd1ahsjyd5uebk.png "Mikrotik RouterOS")](https://mikrotik.com/download "Mikrotik RouterOS")

# mickrotikSSL
## How to install SSL certificate in multiple routers

Due to the need to install ssl certificates on multiple <b>mikrotik routeros</b>, I had to find out a way to use <b>letsencrypt</b> and based on the articles at <b>blog.effenberger.org</b> <i>(Creating SSL certificates on RouterOS with Let's Encrypt)</i>, <b>albertsola.pro</b> <i>(HOWTO: Letsencrypt SSL certificate in Mikrotik)</i> and <b>gitpel/letsencrypt-routeros</b> <i>(Let's Encrypt RouterOS / Mikrotik)</i> I have created a model script for installing SSL certificates on multiple Mikrotik routers.

### Project Recommendation
- Linux Server with letsencrypt installed
- Project folder (script files content): /var/www/rd_code/letsencrypt/
- Certname used: cert.pem(crt), privkey.pem(key)
- Default SSH keypairs name used:  id_rsa, id_rsa.pub

<u>**Note**</u>: 
1. <i>You must include your list of IP-hosts in the "**routers**" file.</i>
2. <i>Check that the directory paths are identical to those of the script.</i>
3. <i>Change your domain name in $DOMAIN variable.</i>

###### References:

- https://github.com/gitpel/letsencrypt-routeros
- https://www.albertsola.pro/howto-use-letsencrypt-ssl-certificate-in-mikrotik/
- https://blog.effenberger.org/2018/04/22/creating-ssl-certificates-on-routeros-with-lets-encrypt/
- https://wiki.mikrotik.com/wiki/Manual:Hotspot_HTTPS_example
