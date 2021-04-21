# Mikrotik login page integration

# Install

#mikrotik device
- I assume your proxy is connected to a radius server, if not, set the radius and hotspor config by enabling login using radius.
- I assume your mikrotik identity  "myMikrotik", cek at System->identity menu. this identity will be recognized by the radius as a nasid.
- open file login.html with your text editor

- change ssid, you can device grouping with this ssid
> <input type="hidden" name="ssid" value="@wicnet">

- change with your domain or ip
> var goUrl = window.location.protocol + "//example.com";

- upload and replace all file in this folder to hotspot folder on your mikrotik device. *remocomended using ftp or sftp

#setup radiusdesk for mikrotik dynamic loginpage
- Crete dynamic login page on login pages menu
- and Add dynamic keys

- matching ssid with ssid on login.html file
> ssid set value=@wicnet 

- matching nasid with mikrotik identity
> nasid set value=myMikrotik

- save, good jobs, your dynamic loginpage integrated success fully.
