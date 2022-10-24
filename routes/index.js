const express = require("express");
const router = express.Router();
// const pageRouter = require("./routes/page");
const authRouter = require("./auth");

const userRouter = require("./users.routes");

router.use("/users", [userRouter]);
// router.use("/", pageRouter);
router.use("/auth", authRouter);

module.exports = router;
