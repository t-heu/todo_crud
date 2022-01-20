exports.up = function(knex) {
  return knex.schema.createTable('user', function(table) {
    table.increments();
    table.string('name').notNullable();
    table.string('password').notNullable();
    table.string('role').defaultTo('user');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('user');
};
