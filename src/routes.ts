import * as express from "express";
import * as fileHandler from "./controllers/file-handling/route"

let router = express.Router();

router.use('/file', fileHandler)

// Export the router
export = router;