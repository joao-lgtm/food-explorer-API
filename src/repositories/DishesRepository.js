const knex = require('../database/knex');

class DishesRepository {
    async createDishes({ img, name, category_id, ingredients, price, description }) {
        const [dishes_id] = await knex('dishes').insert({
            img,
            name,
            category_id,
            ingredients,
            price,
            description
        })


        const ingredientsIsert = ingredients.map(ingredients => {
            return {
                dishes_id,
                ingredients
            }
        });


        await knex("ingredients").insert(ingredientsIsert);

        response.json()
    }

}

module.exports = DishesRepository;



