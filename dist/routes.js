"use strict";
var express = require("express");
var fileHandler = require("./controllers/file-handling/route");
var router = express.Router();
router.use('/file', fileHandler);
module.exports = router;
