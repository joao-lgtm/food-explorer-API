const knex = require('../database/knex');


class CategoryRepository {
    async findAll() {
        const categorys = await knex("categorys"); 

        return categorys;
   }
}

module.exports = CategoryRepository;