"use strict";
var express = require("express");
var controller = require("./controller");
var router = express.Router();
router.get('/', controller.get);
router.post('/upload', controller.upload);
router.get('/trackback', controller.trackback);
module.exports = router;
