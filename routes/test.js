const express = require("express");
const router = express.Router();
const ta = require("../bin/trust_auth");

router.get("/", (req, res) => {
    let ta_option = {
        user_name : req.query.user_name
    };
    ta.getTrustedURL(ta_option)
    .then(value => {
        res.status(200).render("test",{url : value});
    })
    .catch(reason => {
        console.error(reason);
        res.status(500).send("Something was wrong!");
    });
});

module.exports = router;