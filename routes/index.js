const express = require("express");
const router = express.Router();
const commentRouter = require("./comments.routes");

router.use("/comments", commentRouter);

module.exports = router;
