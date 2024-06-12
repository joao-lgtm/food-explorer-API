const knex = require('../database/knex');

class IngredientsRepository {
    async deleteById({ id }) {
        await knex('ingredients').delete().where({ id })
    }
}

module.exports = IngredientsRepository;