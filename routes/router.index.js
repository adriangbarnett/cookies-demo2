const express = require('express')
const router = express.Router()
module.exports = router

const cookieController = require("../controllers/controller.cookie")



router.get("/", (req, res) => { res.render("index", {code: "200", message: "ok"}); })
router.get("/setcookies", cookieController.setcookies)
router.get("/getcookies", cookieController.getcookies)
router.get("/clearcookies", cookieController.clearcookies)
router.get("/getcookieslist", cookieController.getcookieslist)
router.get("/getcookiebyname", cookieController.getcookiebyname)
