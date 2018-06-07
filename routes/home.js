const express = require('express');
const router = express.Router();

const fs = require('fs');
let gv = require('../bin/global_vars');

router.get("/", (req, res) => {
  res.render("home", gv.tableau_server);
});

router.get("/config", (req, res) => {  
  gv.tableau_server.protocol = req.query.protocol;
  gv.tableau_server.port = req.query.port;
  gv.tableau_server.private_ip = req.query.private_ip;
  gv.tableau_server.public_ip = req.query.public_ip;

  fs.writeFileSync('bin/global_vars.js', 'exports.tableau_server = ' + JSON.stringify(gv.tableau_server, null, 2), 'utf8');
  console.log("global_vars.js has been modified...");
  res.send(gv.tableau_server);
});

module.exports = router;