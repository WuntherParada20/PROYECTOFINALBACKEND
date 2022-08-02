const Joi = require('joi');

//Types
const username = Joi.string();
const password = Joi.string().min(6);
const confirmPassword = Joi.valid(Joi.ref('password'));

const userRegisterSchema = Joi.object({
    username: username.required(),
    password: password.required(),
    confirmPassword: confirmPassword.required(),
});

const loginSchema = Joi.object({
    username: username.required(),
    password: password.required()
});

module.exports = { userRegisterSchema, loginSchema };