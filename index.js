const http = require("http");
const fs = require("fs");
const PORT = process.env.PORT || 3000; // set a default port if process.env.PORT is not defined

const handleRequest = (fileName, statusCode, res) => {
    fs.readFile(fileName, "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end(err);
        } else {
            res.writeHead(statusCode, { "Content-Type": "text/html" });
            res.end(data);
        }
    });
}

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        handleRequest("index.html", 200, res);
    } else if (req.url === "/about.html") {
        handleRequest("about.html", 200, res);
    } else if (req.url === "/contact.html") {
        handleRequest("contact.html", 200, res);
    } else {
        handleRequest("404.html", 404, res);
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
