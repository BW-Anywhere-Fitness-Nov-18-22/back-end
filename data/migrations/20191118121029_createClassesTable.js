
exports.up = function (knex) {
  return knex.schema.createTable('classes', table => {
    table.increments();
    table.string('type').notNullable();
    table.date('date').notNullable();
    table.time('startTime').notNullable();
    table.integer('duration').unsigned().notNullable();
    table.string('intensityLevel').notNullable();
    table.string('location').notNullable();
    table.string('description', 256).notNullable();
    table.integer('registeredAttendees').unsigned().defaultTo(0);
    table.integer('maxClassSize').unsigned().notNullable();
    table.integer('instructorId').unsigned().notNullable()
      .references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('classes');
};
