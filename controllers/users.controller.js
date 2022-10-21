const UsersService = require("../services/users.service");
const { InvalidParamsError } = require("../exceptions/index.exception");

const joi = require("../exceptions/joiSchema");

class UsersController {
  constructor() {
    this.usersService = new UsersService();
  }
  userSignup = async (req, res, next) => {
    try {
      const result = joi.userSchema.validate(req.body);

      if (result.error) {
        throw new InvalidParamsError("형식에 맞게 입력해주세요");
      }
      const { ID, nickname, password, confirm } = result.value;
      const createUser = await this.usersService.createUser(
        ID,
        nickname,
        password,
        confirm
      );
      res.status(201).json({
        msg: "회원가입에 성공하였습니다.",
      });
    } catch (error) {
      next(error);
    }
  };
  userLogin = async (req, res, next) => {
    try {
      const { ID, password } = req.body;
      const user = await this.usersService.loginUser(ID, password);

      res.cookie("accessToken", user[1]);
      res.cookie("refreshToken", user[2]);
      res.status(200).json({
        ID: user[0].ID,
        userId: user[0].userId,
        accessToken: user[1],
        refreshToken: user[0].refreshToken,
        msg: "로그인에 성공하였습니다.",
      });
    } catch (error) {
      next(error);
    }
  };
  //*회원정보 수정
  updatUser = async (req, res, next) => {
    try {
      //body로 받는 값 넣어줄건데 뭐로 하지 ?
      const { userId, ID } = res.locals.user;
      const { nickname } = req.body;
      const user = await this.usersService.updatUser(userId, nickname);
      res.status(200).json({ msg: "수정에 성공했습니다." });
      // const existUser = await this.usersService.checkUser(userId)
    } catch (error) {
      next(error);
    }
  };
  deletUser = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      await this.usersService.checkUser(userId);
      res.status(200).json({
        msg: "탈퇴에 성공하였습니다.",
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UsersController;
