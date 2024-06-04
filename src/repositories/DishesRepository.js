const knex = require('../database/knex');

class DishesRepository {
    async createDishes( {img, name, category_id, ingredients, price, description} ) {
        const [dishes_id] = await knex('dishes').insert({
            name,
            img,
            category_id,
            price,
            description
        })

        const ingredientsInsert = ingredients.map(ingredient => {
            return {
                dishes_id,
                name: ingredient.name
            };
        });


        await knex("ingredients").insert(ingredientsInsert);
    }

}

module.exports = DishesRepository;



