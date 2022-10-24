const express = require("express");
const router = express.Router();

const commentRouter = require("./comments.routes");
const recommentRouter = require("./recomments.routes");

// const pageRouter = require("./routes/page");
const authRouter = require("./auth");

const userRouter = require("./users.routes");

router.use("/comments", commentRouter);
router.use("/recomments/comments", recommentRouter);

router.use("/users", [userRouter]);
// router.use("/", pageRouter);
router.use("/auth", authRouter);


module.exports = router;
