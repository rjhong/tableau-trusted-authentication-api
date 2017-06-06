
const querystring = require("querystring");
const global_funcs = require("./global_funcs.js");
const global_vars = require("./global_vars.js");


const getTrustedTicket = (user_name,target_site) => { // target_site is optional.
    let post_options;
    let post_data = new Object();
    
    //request body
    post_data.username = user_name;
    if(target_site != null && target_site != "Default") post_data.target_site = target_site;    
    post_data = querystring.stringify(post_data);

    //request head           
    post_options = {
        host: global_vars.tableau_server.private_ip,
        port: global_vars.tableau_server.port,
        path: '/trusted',
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(post_data)
        }        
    }    
    return global_funcs.requestPromise(post_options, post_data);
}
exports.getTrustedURL = (ta_options) => {
    return new Promise((resolve, reject) => {
        getTrustedTicket(ta_options.user_name, ta_options.target_site)
        .then(ticket => {
            let url = global_vars.tableau_server.public_ip;
            let ticket_path = "/trusted/" + ticket;  
            let site_path = "/t/" + ta_options.target_site;
            let view_path = "/views/" + ta_options.workbook + "/" + ta_options.sheet;
            if(ticket == -1) reject(new Error("invalid ticket, plz check again."));
            url += ticket_path;
            if(ta_options.target_site != null && ta_options.target_site != "Default") url += site_path;
            if(ta_options.workbook == null || ta_options.sheet == null) resolve(url);
            url += view_path;
            resolve(url);
        });
    });    
};