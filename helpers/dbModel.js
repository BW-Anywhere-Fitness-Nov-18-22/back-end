const db = require('../config/dbConfig');

module.exports = {
    addUser,
    findUserBy,

};

async function addUser(user) {
    return db('users')
        .insert(user)
        .returning('id')
        .then(([id]) => {
        return findUserBy({id});
        });

}

function findUserBy(filter) {
    return db('users')
        .where(filter)
        .first()
}


