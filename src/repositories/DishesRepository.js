const knex = require('../database/knex');

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
    
            dishes = await knex("dishes")
                .innerJoin("ingredients", "dishes.id", "ingredients.dishes_id")
                .whereLike("dishes.name", `%${dishes_name}%`)
                .whereIn("ingredients.name", filterIngredientsName)
                .select("dishes.*")
                .groupBy("dishes.id")
                .orderBy("dishes.name");
    
        } else {
            dishes = await knex("dishes")
                .whereLike("name", `%${dishes_name}%`)
                .orderBy("name");
        }
    
        const dishesIds = dishes.map(dish => dish.id);
        const ingredientsDishes = await knex("ingredients")
            .whereIn("dishes_id", dishesIds);
    
        const dishesWithIngredients = dishes.map(dish => {
            const dishIngredients = ingredientsDishes.filter(ingredient => ingredient.dishes_id === dish.id);
            return {
                ...dish,
                ingredients: dishIngredients
            };
        });
    
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



