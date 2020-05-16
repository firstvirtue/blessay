const { Model } = require('objection');
const { generateToken } = require('../lib/token');
const crypto = require('crypto');

// function hash(password) {
//   return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
// }

class Account extends Model {
  static get tableName() {
    return 'account';
  }

  static hash(password) {
    return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
  }

  validate(password) {
    return this.password === Account.hash(password);
  }

  generateToken() {
    const payload = {
      _id: this.$id,
      profile: {
        id: this.id,
        username: this.username, // TODO: profile
        email: this.email
      }
    }

    return generateToken(payload, 'account');
  }
}

module.exports = Account;
