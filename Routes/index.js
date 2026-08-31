const express = require('express');
const {SendImage,GetEnviroment} = require("../Controllers")

const router = express.Router();

router.post("/send-image",SendImage);
router.get("/env",GetEnviroment)


module.exports = router;