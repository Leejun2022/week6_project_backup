const express = require("express");
const router = express.Router();
const commentRouter = require("./comments.routes");
const recommentRouter = require("./recomments.routes");

router.use("/comments", commentRouter);
router.use("/recomments/comments", recommentRouter);

module.exports = router;
