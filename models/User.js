
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// creates user model
class User extends Model {}

// defines table columns and configurations
User.init(
  {
    // defines id column
    id: {
      // uses Sequelize DataTypes object to provide what type of data it is
      type: DataTypes.INTEGER,
      // SQL's not null option
      allowNull: false,
      // instructs primary key
      primaryKey: true,
      autoIncrement: true
    },
    // defines username column
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // defines email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // cannot be duplicate email values in table
      unique: true,
      // if allownull is set to false we can run our data through validators
      validate: {
        isEmail: true
      }
    },
    // defines password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // password must be at least four characters long
        len: [4]
      }
    }
  },
  {
    hooks: {
      // sets up beforeCreate lifecycle hook functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
        },

      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }

      },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;