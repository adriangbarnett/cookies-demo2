const DURATION = require("../config/config.milliseconds.js").DURATION

function setcookies(req, res) {
    
    try {

        const options = {
            httpOnly: false,
            secure: false,
            maxAge: DURATION.hour
        }
        
        res.cookie("sky", "blue", options);
        res.cookie("grass", "green", options);

        return res.send("Cookies set")


    } catch(e) {
        console.log({e: e.message})
    }
 

}

// get all cookies
// src: https://stackoverflow.com/questions/3393854/get-and-set-a-single-cookie-with-node-js-http-server
// split all existing cookies into a list
function getcookieslist(req, res){

    if (!req.headers.cookie) {
        return res.send("no cookies || cookies expired")
    }

    const list = {}
    const cookieHeader = req.headers?.cookie;

    cookieHeader.split(`;`).forEach(function(cookie) {
        let [ name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        list[name] = decodeURIComponent(value);
    });

    return res.send({message: "list of cookies", list: list})
}

// get specific cookies
function getcookies(req, res) {
    const cookies = {
        sky: req.cookies.sky,
        grass: req.cookies.grass
    }
    return res.send({cookies: cookies})
}


function getcookiebyname(req, res) {

    try {

        const name = req.query.name;
        const cookieHeader = req.headers?.cookie;
    
        var match = cookieHeader.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) { 
            return res.send({message: "match found", name: name, value: match[2] });
        }
        else {
            return res.send({message:"cookie not found in header", name: name}); 
        }

    } catch (e) {
        return res.send({e: e.message})
    }
  
}

function clearcookies(req, res) {

    if (req.cookies.sky !== null)  {
        res.clearCookie("sky");
    }
    if (req.cookies.grass !== null)  {
        res.clearCookie("grass");
    }
    return res.send("Cookies cleared")

}



module.exports = {
    setcookies,
    getcookies,
    clearcookies,
    getcookieslist,
    getcookiebyname
}