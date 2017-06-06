const http = require("http");
exports.requestPromise = (req_options, req_body) => {
    return new Promise((resolve, reject) => {
        const req = http.request(req_options, res => {
            res.setEncoding("UTF-8");
            let data = [];
            res.on("data",chunk => data.push(chunk));
            res.on("end",() => resolve(data));
        });
        req.write(req_body);
        req.end();
    });
}