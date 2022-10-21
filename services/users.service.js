require("dotenv").config();
const UsersRepository = require("../repositories/users.repository");
const { ValidationError } = require("../exceptions/index.exception");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

class UsersService {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  createUser = async (ID, password, confirm) => {
    try {
      if (password !== confirm) {
        throw new ValidationError("비밀번호를 확인해주세요");
      }
      const findId = await this.usersRepository.findOneId(ID);
      if (findId) {
        throw new ValidationError("이미 사용중인 아이디입니다.");
      }
      const createUser = await this.usersRepository.createUser(ID, password);
      return createUser;
    } catch (error) {
      next(error);
    }
  };
  loginUser = async (ID, password) => {
    try {
      const user = await this.usersRepository.findOneId(ID);

      if (!user) {
        throw new ValidationError("아이디 또는 패스워드가 틀립니다.");
      }
      if (password !== user.password) {
        throw new ValidationError("아이디 또는 패스워드가 틀립니다.");
      }
      const accessToken = jwt.sign(
        { userId: user.userId },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
      );
      const refreshToken = jwt.sign(
        { userId: user.userId },
        process.env.SECRET_KEY,
        { expiresIn: "21d" }
      );

      await this.usersRepository.updateRefresh(refreshToken, user);

      return [user, accessToken, refreshToken];
    } catch (error) {
      next(error);
    }
  };
}
module.exports = UsersController;
