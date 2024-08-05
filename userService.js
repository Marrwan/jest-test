const { User } = require('./db');

const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

const createUser = async (userData) => {
  return await User.create(userData);
};

const deleteUser = async (email) => {
  return await User.destroy({ where: { email } });
};

const updateUser = async (email, newUserData) => {
  return await User.update(newUserData, { where: { email } });
};

const assignUser = async(email,client) => {
  const user = await User.findOne({where: {email}});
  user.clients = client
  return user;
}

module.exports = { getUserByEmail, createUser, deleteUser, updateUser, assignUser };
