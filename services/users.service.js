require("dotenv").config();
const UsersRepository = require("../repositories/users.repository");
const { ValidationError } = require("../exceptions/index.exception");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { nextTick } = require("process");

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
    } catch (error) {
      next(error);
    }
  };
}
module.exports = UsersController;
