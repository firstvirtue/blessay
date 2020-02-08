const Joi = require('joi');

exports.localRegister = async (ctx) => {

  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(4).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6)
  });

  const result = Joi.validate(ctx.request.body, schema);

  if(result.error) {
    ctx.status = 400;
    return;
  }
  
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
