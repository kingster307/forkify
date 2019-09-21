// global variables 
const http      = require('http'),
    fs          = require("fs"),
    path        = require('path'),
    url         = require('url');
let systemPort  = process.env.PORT || 1234;

http.createServer(reqListener).listen(process.env.PORT || 1234, listenLoggingConfirmation);

// Request event listener 
function reqListener(req, res) {
    // finding req's Ip Address
    logClientIpAddress(req);
    // initial config
    let urlRequestRoute = url.parse(req.url, true).pathname === "/" ? "index.html" : url.parse(req.url, true).pathname,
        fileExtension = path.extname(urlRequestRoute),
        responseHead = {
            statusCode: 200,
            contentType: { 'Content-Type': findReqMeta(fileExtension.toLowerCase().slice(1), res).contentType }
        },
        fullPath = path.join(__dirname, urlRequestRoute);
    //Routes
    if (urlRequestRoute === "index.html") {
        res.writeHead(responseHead.statusCode, responseHead.contentType);
        fs.createReadStream(fullPath, `utf-8`).pipe(res);
    } else if (fs.existsSync(fullPath)) {
        res.writeHead(responseHead.statusCode, responseHead.contentType);
        fs.createReadStream(fullPath).pipe(res);
    } else {
        responseHead.statusCode = 404;
        responseHead.contentType = "text/html"
        res.writeHead(responseHead.statusCode, responseHead.contentType);
        res.end("Page not found. Check your spelling & try again");
    }
}



// find request Metadata helper function
function findReqMeta(fileExtension, res) {

    // create object
    let meta = {
        contentType: undefined,
        extensionDirectory: undefined
    };

    //search for locally avaliable extensions
    switch (fileExtension) {
        case "html":
            meta.contentType = "text/html";
            meta.extensionDirectory = "";
            break;
        case "css":
            meta.contentType = "text/css";
            meta.extensionDirectory = "css";
            break;
        case "js":
            meta.contentType = "text/javascript";
            meta.extensionDirectory = "js";
            break;
        case "jpg" || "jpeg":
            meta.contentType = "image/jpeg";
            meta.extensionDirectory = "img";
            break;
        case "png":
            meta.contentType = "image/png";
            meta.extensionDirectory = "img";
            break;
        case "svg":
            meta.contentType = "image/svg+xml";
            meta.extensionDirectory = "img";
            break;
        // server has no extension of this type 
        default:
            res.writeHead(404, { 'Content-type': 'text/html' });
            res.end(`Error File type not found`);
            break;
    }
    return meta;
}
// 
function listenLoggingConfirmation() {
    console.log(`server is listening on port ${systemPort}`)
}

function logClientIpAddress(req) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(ip);
}