exports.up = function (knex) {
  return knex.schema.createTable('reservations', table => {
    table.primary(['userId', 'classId']);
    table.integer('userId').unsigned().notNullable()
      .references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    table.integer('classId').unsigned().notNullable()
      .references('id').inTable('classes').onUpdate('CASCADE').onDelete('CASCADE');
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('reservations');
};
