# tableau_trusted_authentication_api

## Introduction

This work is to simplify the [Trusted Authentication](https://onlinehelp.tableau.com/current/server/en-us/trusted_auth_how.htm) work for Tableau Server by Node.js.

>What's **Tableau** ? Tableau is one of well known Business Intelligence Tools.  
[More Info](https://www.tableau.com/)

[Trusted Authentication](https://onlinehelp.tableau.com/current/server/en-us/trusted_auth_how.htm) is a Single-Sign-On method for us to retrieve views *(we call them viz)* from **Tableau Server** to our **Web Server** using HTTP/HTTPS protocols to do so. Whatever your **Web Server** is build by which programming languages, as long as you can use it to access HTTP/HTTPS protocols you can do [Trusted Authentication](https://onlinehelp.tableau.com/current/server/en-us/trusted_auth_how.htm). In this case I use Node.js to approach.

## Begin works

First, you need to have a **Tableau Server**, then get some setup on **Tableau Server** side. eg: tell **Tableau Server** to trusted your **Web Server** ...etc, you can either use TSM CLI or TSM web interface.
```cmd
tsm authentication trusted configure -th "<trusted IP addresses or host names>"
tsm pending-changes apply
```
>[References about this setup.](https://onlinehelp.tableau.com/current/server/en-us/trusted_auth_trustIP.htm)


Additionally, there is one thing to know, **Tableau Trsuted Authentication** has a restriction as default, which is :
* As default, if using this way to implement Single-Sign-On, user can only access views only. If you want to access whole **Tableau Server** resources, use ```tsm configuration set``` to disable this restriction as follow :
####This step is optional and not recommended.
```cmd
tsm configuration set --key wgserver.unrestricted_ticket --value true
tsm pending-changes apply
```

##  How to use **tableau_trusted_authentication_api**
* the prerequisite is to install [node.js](https://nodejs.org/en/).
* Clone this project to your local file.
* Run the following command.
```cmd
cd /to_project_directory/
npm install
node app.js
``` 
You will see the following output :

```
Listening at port : 8080
```

## Start using it!
Open you browser, navigate to
###http://localhost:8080/home/
It will looks like the this...
![demo](./public/images/demo.gif)
