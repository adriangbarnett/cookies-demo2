const express = require("express")
app = express()

const path = require('path')
require('dotenv').config({ path: '.cfg' })
const cookieParser = require("cookie-parser")

app.use(cookieParser());
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use("/", express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

indexRouter = require ("./routes/router.index.js")
app.use("/", indexRouter)


app.get("*", (req, res) => { res.render("error", {code: "404", title: "error", heading: "ERROR", message: "page not found", }); })

// Start
app.listen(3000, function(req, res) { 
    console.log("Started, version: " + process.env.version);
});