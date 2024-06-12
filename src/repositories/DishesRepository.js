const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class DishesRepository {
    async findById({ id }) {
        const [dishes] = await knex("dishes").where({ id });
        const ingredients = await knex("ingredients").where({ dishes_id: id }).orderBy("name");

        if(!dishes){
            return null;
        }

        return ({ ...dishes, ingredients });
    }

    async findByNameAndIngredients({ dishes_name, ingredients_name }) {
        let dishes;
        if (ingredients_name) {
            const filterIngredientsName = ingredients_name.split(',').map(name => name.trim());

            dishes = await knex("ingredients")
                .whereLike("dishes.name", `%${dishes_name}%`)
                .whereIn("ingredients.name", filterIngredientsName)
                .innerJoin("dishes", "dishes.id", "ingredients.dishes_id")
                .orderBy("dishes.name");

        } else {
            dishes = await knex("dishes")
                .whereLike("name", `%${dishes_name}%`)
                .orderBy("name")
        }

        const ingredientsDishes = await knex("ingredients")
        const dishesWithIngredients = dishes.map(dishes => {
            const dishesIngredients = ingredientsDishes.filter(ingredients => ingredients.dishes_id === dishes.id)


            return {
                ...dishes,
                ingredients: dishesIngredients
            }

        })

        return dishesWithIngredients;
    }

    async createDishes({ img, name, category_id, ingredients, price, description }) {
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

    async updateDishes({ id, img, name, category_id, ingredients, price, description }) {
        await knex('dishes').update({
            name,
            img,
            category_id,
            price,
            description
        }).where({ id });

        const ingredientsInsert = ingredients.map(ingredient => {
            return {
                dishes_id: id,
                name: ingredient.name
            };
        });


        await knex("ingredients").insert(ingredientsInsert);
    }


    async deleteDishes({ id }) {
        await knex('dishes').delete().where({ id })
    }


}

module.exports = DishesRepository;



