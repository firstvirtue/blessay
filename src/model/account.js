const { Model } = require('objection');
const { generateToken } = require('../lib/token');

class Account extends Model {
  static get tableName() {
    return 'account';
  }

  generateToken() {
    const payload = {
      _id: this.$id,
      profile: this.username // TODO: profile
    }

    return generateToken(payload, 'account');
  }
}

module.exports = Account;
