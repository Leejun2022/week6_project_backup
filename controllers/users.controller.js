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
}
