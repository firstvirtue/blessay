const Joi = require('joi');

exports.localRegister = async (ctx) => {
  ctx.body = 'register';
}

exports.localLogin = async (ctx) => {
  ctx.body = 'login';
}

exports.exists = async (ctx) => {
  ctx.body = 'exists';
}

exports.logout = async (ctx) => {
  ctx.body = 'logout';
}
