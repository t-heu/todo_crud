exports.up = function(knex) {
  return knex.schema.createTable('client', function(table) {
    table.increments();
    table.string('code').notNullable();
    table.string('corporate_name').collate('utf8_unicode_ci').notNullable();
    table.string('name').collate('utf8_unicode_ci').notNullable();
    table.string('branch_id').notNullable();
    table.foreign('branch_id').references('id').inTable('branch');
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('client')
};
