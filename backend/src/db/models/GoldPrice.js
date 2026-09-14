/**
 * Gold Price model
 */
const { Model } = require('objection');

class GoldPrice extends Model {
  static get tableName() {
    return 'gold_prices';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['marketPrice', 'buyPrice', 'sellPrice', 'source'],
      properties: {
        id: { type: 'integer' },
        marketPrice: { type: 'number' },
        buyPrice: { type: 'number' },
        sellPrice: { type: 'number' },
        source: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' }
      }
    };
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = GoldPrice; 