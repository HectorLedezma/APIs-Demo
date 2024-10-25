const express = require('express');
const {GetRequest, PostRequest, PutRequest} = require("../Controllers")

const router = express.Router();

router.get("/get-request",GetRequest);
router.post("/post-request",PostRequest);
router.put("/put-request",PutRequest)

module.exports = router;