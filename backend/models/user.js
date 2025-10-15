
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    phone:  {
      type: DataTypes.STRING,
      defaultValue:"0544069203" 
    }
  });

  User.beforeCreate((user) => {
    return bcrypt.hash(user.password, 10).then((hash) => {
      user.password = hash;
    });
  });

  User.prototype.isValidPassword = function (password) {
    return bcrypt.compare(password, this.password);
  };

  return User;
};
