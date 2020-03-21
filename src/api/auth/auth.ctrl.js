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
    used = await Account.query().select('email', 'password').where('email', '=', newAccount.email);
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
    username: Joi.string().required(),
    password: Joi.string().required()
  });

  const result = Joi.validate(ctx.request.body, schema);

  if(result.error) {
    ctx.status = 400;
    return;
  }

  const { username, password } = ctx.request.body;

  let account = null;
  try {
    account = await Account.query().select('username', 'email', 'password', 'created_on').where('username', '=', username).first();
  } catch (e) {
    ctx.throw(500, e);
  }

  if(account.password !== password) {
    ctx.status = 403;
    return;
  }

  let token = null;
  try {
    token = await account.generateToken();
  } catch (e) {
    ctx.throw(500, e);
  }

  console.log(account);

  ctx.cookies.set('access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
  delete account.password;
  ctx.body = account;
}

exports.exists = async (ctx) => {
  const { key, value } = ctx.params;
  let account = null;

  try {
    account = await (key === 'email' ?
      Account.query().select('username').where('email', '=', value).first() :
      Account.query().select('username').where('username', '=', value).first())
  } catch (e) {
    ctx.throw(500, e);
  }

  ctx.body = {
    exists: account !== null && account !== undefined
  };
}

exports.logout = async (ctx) => {
  ctx.cookies.set('access_token', null, {
    maxAge: 0,
    httpOnly: true
  });
  ctx.status = 204;
}

exports.check = (ctx) => {
  const { user } = ctx.request;
  // console.log(user);

  if(!user) {
    ctx.status = 403; // forbidden
    return;
  }

  ctx.body = user;
}

exports.user = (ctx) => {
  const { user } = ctx.request;
  // console.log(user);

  if(!user) {
    ctx.status = 403; // forbidden
    return;
  }

  ctx.body = user;
}
