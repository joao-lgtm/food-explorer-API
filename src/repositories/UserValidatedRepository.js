const knex = require('../database/knex');


class UserValidatedRepository {
    async findById({ id }) {
        const user = await knex("users").where({ id }).first();

        return user;
    }
}

module.exports = UserValidatedRepository;