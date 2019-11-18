
exports.up = function(knex) {
  return knex.schema.createTable('classes', table => {
      table.increments();
      table.string('type').notNullable();
      table.date('date').notNullable();
      table.time('startTime').notNullable();
      table.string('duration').notNullable();
      table.string('intensityLevel').notNullable();
      table.string('location').notNullable();
      table.integer('registeredAttendees').notNullable();
      table.integer('maxClassSize').notNullable();
      table.integer('instructorId').unsigned().notNullable()
      .references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('classes');
};
