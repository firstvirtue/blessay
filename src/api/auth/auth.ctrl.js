const Joi = require('joi');
const Account = require('../../model/account');

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

  const {
    email,
    username,
    password
  } = ctx.request.body;

  const newAccount = {
    email: email,
    username: username,
    password: password,
    created_on: new Date().toISOString()
  }

  try {
    const account = await Account.query().insert(newAccount);

    ctx.body = account;
  } catch(e) {
    console.log(e);
  }
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
