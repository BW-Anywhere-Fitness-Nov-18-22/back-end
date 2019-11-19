const db = require('../config/dbConfig');

module.exports = {
    addUser,
    findUserBy,
    addClass,
    findClassByInstructorId,
    editClass,
    removeClass,
    findClassByCondition,
    addAttendee,
    findClassesByUserid,
    removeAttendee
};

async function addUser(user) {
    return db('users')
        .insert(user)
        .returning('id')
        .then(([id]) => {
            return findUserBy({ id });
        });

}

function findUserBy(filter) {
    return db('users')
        .where(filter)
        .first()
}

function addClass(userClass) {
    return db('classes')
        .insert(userClass)
        .returning('id')
        .then(([id]) => {
            return findClassByInstructorId({ id })
        })
}

function findClassByInstructorId(id) {
    return db('classes')
        .where(id)
}

async function editClass(id, changes) {
    await db('classes')
    .where({id})
    .update(changes)
    return await db('classes')
    .where({id})
    .first()
}

function removeClass(id) {
    return db('classes')
    .where({id})
    .delete()
}

function findClassByCondition(condition) {
    return db('classes')
    .where(condition)
} 

function findClassesByUserid(id){
    return db('classes as c')
    .join('reservations as r', 'r.classId', 'c.id')
    .join('users as u', 'u.id', 'r.userId')
    .select('c.id', 'c.type', 'c.date', 'c.startTime', 'c.location', 'c.intensityLevel', 'c.duration', 'c.maxAttendees', 'c.registeredAttendees')
    .where({'r.userId': id})
}

async function addAttendee(reservation) {
    //check that maxattendees has not been reached
    //update the class entry on class table by increasing registeredAttendees
    //add an entry to reservations table saying userid: classId

    let info = await db('classes').where({id: reservation.classId}).select('registeredAttendees', 'maxClassSize').first();
    if(info.maxClassSize > info.registeredAttendees){
        await db('classes').where({id: reservation.classId}).update({registeredAttendees: info.registeredAttendees + 1})
        return await db('reservations').insert(reservation).returning('id').first();
    } else {
        return null
    }
}

async function removeAttendee(id) {
    let reservationtodelete = await db('reservations').where({id}).first()
    let info = await db('classes').where({id: reservationtodelete.classId}).select('registeredAttendees').first()
    await db('classes').where({id: reservation.classId}).update({registeredAttendees: info.registeredAttendees - 1})
    return await db('reservations').where({id}).delete()
}

