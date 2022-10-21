const { User } = require("../models");

class UsersRepository {
  findOneId = async (userId) => {
    const findOneId = await User.findOne({ where: { userId } });
    return findOneId;
  };
  createUser = async (ID, nickname, password) => {
    const createUser = await User.create({ ID, nickname, password });
    return createUser;
  };
  deleteUser = async (userId, ID, password) => {
    const deleteUser = await User.destroy({ where: { userId, ID, password } });
    return deleteUser;
  };
  updateRefresh = async (refreshToken, user) => {
    await User.update({ refreshToken }, { where: { userId: user.userId } });
  };
}

module.exports = UsersRepository;
