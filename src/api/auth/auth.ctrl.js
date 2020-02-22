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
    password: password, // TODO: hash
    created_on: new Date().toISOString()
  }

  let used = null;
  try {
    used = await Account.query().select('email', 'password').where('email', '=', email);
  } catch (e) {
    ctx.throw(500, e);
  }

  if(used.length > 0) {
    ctx.status = 409;
    ctx.body = {
      key: 'email'
    }

    return;
  }

  try {
    account = await Account.query().insert(newAccount);
  } catch (e) {
    ctx.throw(500, e);
  }

  ctx.body = account;
}

exports.localLogin = async (ctx) => {

  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  const result = Joi.validate(ctx.request.body, schema);

  if(result.error) {
    ctx.status = 400;
    return;
  }

  const { email, password } = ctx.request.body;

  let account = null;
  try {
    account = await Account.query().select('username', 'email', 'password', 'created_on').where('email', '=', email).first();
  } catch (e) {
    ctx.throw(500, e);
  }

  if(account.password !== password) {
    ctx.status = 403;
    return;
  }

  ctx.body = account;
}

exports.exists = async (ctx) => {
  let account = await Account.query().select('email', 'password').where('email', '=', 'firstvirtue@naver.com');
  console.log(account);
  ctx.body = account;
}

exports.logout = async (ctx) => {
  ctx.body = 'logout';
}
