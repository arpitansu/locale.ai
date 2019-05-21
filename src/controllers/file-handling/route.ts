import * as express from "express";
import * as controller from "./controller"

let router = express.Router();

router.get('/', controller.get)

router.post('/upload', controller.upload)

router.get('/trackback', controller.trackback)

// Export the router
export = router;