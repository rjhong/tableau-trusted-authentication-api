# tableau_trusted_authentication_api

## Introduction

This work is to modularize the [Trusted Authentication](https://onlinehelp.tableau.com/current/server/en-us/trusted_auth_how.htm) work for Tableau Server as a REST API by Node.js.

>What's **Tableau** ? Tableau is one of well known Business Intelligence Tools.  
[More Info](https://www.tableau.com/)

[Trusted Authentication](https://onlinehelp.tableau.com/current/server/en-us/trusted_auth_how.htm) is a Single-Sign-On method for us to retrieve views *(we call them viz)* from **Tableau Server** to our **Web Server** using HTTP/HTTPS protocols to do so. Whatever your **Web Server** is build by which programming languages, as long as you can use it to access HTTP/HTTPS protocols you can do [Trusted Authentication](https://onlinehelp.tableau.com/current/server/en-us/trusted_auth_how.htm). In this case I use Node.js to approach.

## Begin works

First, you need to have **Tableau Server**, then get some setup on **Tableau Server** side, like tell **Tableau Server** to trusted your **Web Server** ...etc.
> Please follow [this step](https://onlinehelp.tableau.com/current/server/en-us/trusted_auth_trustIP.htm) to do so.

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
    public_ip : "59.124.53.68",
    //privat ip, used when transaction between web server and tableau server
    private_ip : "192.168.0.206",
    //port that Tableau Server use.
    port : "80"
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

Not yet done...

