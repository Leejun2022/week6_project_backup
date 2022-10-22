require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { MiddlewareError } = require("../exceptions/index.exception");

module.exports = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    const { refreshToken } = req.cookies;

    if (!accessToken || !refreshToken) {
      throw new MiddlewareError("로그인이 필요합니다");
    }
    let accessVerified = null;
    let refreshVerified = null;

    try {
      accessVerified = jwt.verify(accessToken, process.env.SECRET_KEY);
    } catch (error) {
      accessVerified = null;
    }
    try {
      refreshVerified = jwt.verify(refreshToken, process.env.SECRET_KEY);
    } catch (error) {
      refreshVerified = null;
    }
    try {
      if (!accessVerified && !refreshVerified) {
        throw new MiddlewareError("로그인 기한이 만료되었습니다.");
      }
      if (!accessVerified && refreshVerified) {
        const existUser = await User.findOne({
          where: { refreshToken: refreshToken },
        });
        if (!existUser) {
          throw new MiddlewareError("로그인 기한이 만료되었습니다.");
        }

        const userId = existUser.userId;
        const newAccessToken = jwt.sign({ userId }, process.env.SECRET_KEY, {
          expiresIn: "1d",
        });
        res.cookies("accessToken", newAccessToken);

        return res.status(201).json({
          accessToken: newAccessToken,
          refreshToken: refreshToken,
          msg: "access 토큰이 재발급되었습니다.",
        });
      }
      if (accessVerified && !refreshVerified) {
        const { userId } = accessVerified;
        const existUser = await User.findOne({ where: { userId } });
        if (!existUser) {
          throw new MiddlewareError("로그인 기한이 만료되었습니다.");
        }
        const newRefreshToken = jwt.sign({ userId }, process.env.SECRET_KEY, {
          expiresIn: "21d",
        });

        await User.update(
          { refreshToken: newRefreshToken },
          { where: { userId } }
        );
        res.cookies("refreshToken", newRefreshToken);
        return res.status(201).json({
          accessToken: accessToken,
          refreshToken: newRefreshToken,
          msg: "refresh 토큰이 재발급되었습니다.",
        });
      }
      if (accessVerified && refreshVerified) {
        const { userId } = accessVerified;
        User.findOne({
          where: { userId },
          attributes: ["userId", "username"],
        }).then((user) => {
          res.locals.user = user;
          next();
        });
      }
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
