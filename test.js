const ta = require("./bin/trust_auth.js");
const qs = require("querystring");

let ta_options = new Object();
ta_options.user_name = "ray";
ta_options.target_site = "Sales";
ta_options.workbook = "Book1";
ta_options.sheet = "Sheet1";
ta.getTrustedURL(ta_options)
.then(value => {console.log(value)});

