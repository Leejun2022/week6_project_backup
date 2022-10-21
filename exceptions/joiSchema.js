const joi = require("joi");

const IDRegEx = /^[A-Za-z0-9]{3,20}$/;
const nicknameRegEx = /^[A-Za-z0-9]{3,20}$/;
const passwordRegEx = /^[A-Za-z0-9]{3,20}$/;

exports.userSchema = joi.object({
  ID: joi.string().pattern(IDRegEx).required(),
  password: joi.string().pattern(passwordRegEx).required(),
  nickname: joi.string().pattern(nicknameRegEx).required(),
  confirm: joi.string(),
});
