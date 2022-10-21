const { User } = require("../models");

class UsersRepository {
  findOneUser = async (userId) => {
    const findOneId = await User.findOne({ where: { userId } });
    return findOneId;
  };
  findOneNickname = async (nickname) => {
    const findOneNickname = await User.findOne({ where: { nickname } });
    return findOneNickname;
  };
  createUser = async (ID, nickname, password) => {
    const createUser = await User.create({ ID, nickname, password });
    return createUser;
  };
  deleUser = async (userId, ID, password) => {
    const deleteUser = await User.destroy({ where: { userId, ID, password } });
    return deleteUser;
  };
  updateRefresh = async (refreshToken, user) => {
    await User.update({ refreshToken }, { where: { userId: user.userId } });
  };
  updatUser = async (userId, nickname) => {
    await User.update({ nickname }, { where: userId });
  };
}

module.exports = UsersRepository;
