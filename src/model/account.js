const { Model } = require('objection');
const { generateToken } = require('../lib/token');

class Account extends Model {
  static get tableName() {
    return 'account';
  }

  generateToken() {
    const payload = {
      _id: this.$id,
      profile: {
        username: this.username, // TODO: profile
        email: this.email
      }
    }

    return generateToken(payload, 'account');
  }
}

module.exports = Account;
