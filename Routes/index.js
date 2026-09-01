const express = require('express');
const {SendImage,GetEnviroment,ping} = require("../Controllers")

const router = express.Router();

router.post("/send-image",SendImage);
router.post("/env",GetEnviroment);
router.get("/env",ping);


module.exports = router;