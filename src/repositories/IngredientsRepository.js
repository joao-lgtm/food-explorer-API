const knex = require('../database/knex');

class IngredientsRepository {

    async findById({ id }) {
        const ingredients = await knex("ingredients").where({ id }).first();
        return ingredients;
    }
    async deleteById({ id }) {
        await knex('ingredients').delete().where({ id })
    }
}

module.exports = IngredientsRepository;