# tableau_trusted_authentication_api

## Introduction

This work is to modularize the [Trusted Authentication](https://onlinehelp.tableau.com/current/server/en-us/trusted_auth_how.htm) work for Tableau Server as a REST API by Node.js.

>What's **Tableau** ? Tableau is one of well known Business Intelligence Tools.  
[More Info](https://www.tableau.com/)

[Trusted Authentication](https://onlinehelp.tableau.com/current/server/en-us/trusted_auth_how.htm) is a Single-Sign-On method for us to retrieve views *(we call them viz)* from **Tableau Server** to our **Web Server** using HTTP/HTTPS protocols to do so. Whatever your **Web Server** is build by which programming languages, as long as you can use it to access HTTP/HTTPS protocols you can do [Trusted Authentication](https://onlinehelp.tableau.com/current/server/en-us/trusted_auth_how.htm). In this case I use Node.js to approach.

## Begin works

First, you need to have a **Tableau Server**, then get some setup on **Tableau Server** side. eg: tell **Tableau Server** to trusted your **Web Server** ...etc.
> Please follow [this step](https://onlinehelp.tableau.com/current/server/en-us/trusted_auth_trustIP.htm) to do so.

Additionally, there is one thing to know, **Tableau Trsuted Authentication** has a restriction as default, which is :
* As default, if using this way to implement Single-Sign-On, user can only access views only. If you want to access whole **Tableau Server** resources, use ```tabadmin set``` to disable this restriction as follow :
```
tabadmin stop
tabadmin set wgserver.unrestricted_ticket true
tabadmin config
tabadmin start
```
Now, you can access whole resources using **Trusted Authentication**!
>**CAUTION :** Be aware to prevent **Trust Ticket** exposed before first redeemed.

##  How to use **tableau_trusted_authentication_api**

* Clone this project to your local file.
* Run the following command.
```cmd
cd /to_project_directory/
npm install
```
Then, configure something in the file  ```./bin/global_vars.js``` :
```javascript
exports.tableau_server = {
    //Tableau Server's public ip, it will used when client visit Tableau Server. 
    public_ip : "xx.xx.xx.xx",
    //privat ip, used when transaction between web server and tableau server
    private_ip : "192.168.xx.xx",
    //port that Tableau Server use.
    port : "443",
    //using SSL/TSL or not.
    protocol : "https"
}
``` 
After those setting, run this :
```
node app.js
```
You will see the following output :

```
Listening at port : 8080
```

## Testing

You will using GET Method to access this Web Service, some parameters should know first :

Paramter|Describe
-----|-----
*user_name*|Tableau Server's vaild user name who has permission to access views.
*target_site*|*(Optional)* Site ID on Tableau Server, if you are visiting default site, ignore it.
*workbook*|Workbook ID on Tableau Server.
*sheet*| Sheet name or View name on Tableau Server.



Use [localhost:8080](localhost:8080) to visit the Web Service , then use 
<br>For example : [localhost:8080/api/test?user_name=lisa&target_site=sales_department&workbook=monthly_report&sheet=what_if_analysis](localhost:8080/api/test?user_name=lisa&target_site=sales_department&workbook=monthly_report&sheet=what_if_analysis)
<br>Then, it will redirect to **Tableau Server** in 5 secs..

## How to use

Enter this:
<br>[localhost:8080/api/trusted_url?user_name=lisa&target_site=sales_department&workbook=monthly_report&sheet=what_if_analysis](localhost:8080/api/test?user_name=lisa&target_site=sales_department&workbook=monthly_report&sheet=what_if_analysis)
<br> you will recieve an URL like below :[http://xx.xx.xx.xx:80/trusted/kWehOMTrQCKbTGgcXgzYiw==:D4UobMU-stIncFvTqlXFmkK9]()
use this URL to visit **Tableau Server**.