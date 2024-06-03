let http = require("http")
const { json } = require("stream/consumers")
let url = require('url')

let server = http.createServer((req, res) => {
    let _url = url.parse(req.url, true)
    
    if(_url.pathname == "/" || _url.pathname == '/favicon.ico'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('<form method="post" action="/bello"> <input type="text" placeholder="enter value to post" name="fullname" /> <input type="submit" name="submit" value="SUBMIT"/> </form>');
    } else {
        res.end(response(req.method, _url.pathname, _url.query))
    }
})

let response = (method, path, queryString = null) => {
    console.log("method: " + method);
    console.log("path: " + path);
    console.log("queryString: ", queryString);
    return method + ' : ' + path + ' : ' + JSON.stringify(queryString)
}

server.listen(8080, () => {
    console.log('Node Server listening')
})

