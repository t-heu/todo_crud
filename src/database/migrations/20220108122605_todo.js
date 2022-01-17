exports.up = function(knex) {
  return knex.schema.createTable('todo', function(table) {
    table.increments();
    table.string('code').notNullable();
    table.string('corporate_name').notNullable();
    table.string('name').notNullable();
    table.string('branch_id').notNullable();
    table.foreign('branch_id').references('id').inTable('branchs');
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('todo')
};
