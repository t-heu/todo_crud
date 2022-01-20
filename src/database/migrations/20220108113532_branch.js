exports.up = function(knex) {
  return knex.schema.createTable('branch', function(table) {
    table.string('id').primary();
    table.integer('code_branch').notNullable();
    table.string('city').notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('branch')
};
