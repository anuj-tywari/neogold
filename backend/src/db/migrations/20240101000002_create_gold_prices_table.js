/**
 * Migration to create the gold_prices table
 */
exports.up = function(knex) {
  return knex.schema.createTable('gold_prices', (table) => {
    table.increments('id').primary();
    table.decimal('marketPrice', 12, 2).notNullable().comment('Market price per gram in INR');
    table.decimal('buyPrice', 12, 2).notNullable().comment('Price at which customers buy from us');
    table.decimal('sellPrice', 12, 2).notNullable().comment('Price at which customers sell to us');
    table.string('source').notNullable().comment('Source of the price data');
    table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
    
    // Add index for faster querying by date range
    table.index('createdAt');
  });
};

/**
 * Drop the gold_prices table
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('gold_prices');
}; 