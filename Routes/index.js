const express = require('express');
const {SendImage} = require("../Controllers")

const router = express.Router();

router.post("/send-image",SendImage);


module.exports = router;