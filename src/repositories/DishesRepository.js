const knex = require('../database/knex');

class DishesRepository {
    async findById({ id }) {
        const [dishes] = await knex("dishes").where({ id });
        const ingredients = await knex("ingredients").where({ dishes_id: id }).orderBy("name");

        if (!dishes) {
            return null;
        }

        return ({ ...dishes, ingredients });
    }

    async findByNameAndIngredients({ disher_ingredients }) {
        // Primeiro, obtenha os pratos com base na pesquisa
        const dishes = await knex("dishes")
            .innerJoin("categorys", "categorys.id", "dishes.category_id")
            .where(builder => {
                builder.whereLike("dishes.name", `%${disher_ingredients}%`)
                    .orWhereExists(function () {
                        this.select("*")
                            .from("ingredients")
                            .whereRaw("ingredients.dishes_id = dishes.id")
                            .whereLike("ingredients.name", `%${disher_ingredients}%`);
                    });
            })
            .select("dishes.*")
            .select("categorys.name as category_name")
            .groupBy("dishes.id")
            .orderBy("dishes.name");

        const ingredients = await knex("ingredients")
            .select("ingredients.dishes_id", "ingredients.name as ingredient_name");

        const dishesWithIngredients = dishes.map(dish => {
            const dishIngredients = ingredients.filter(ingredient => ingredient.dishes_id === dish.id);
            return {
                ...dish,
                ingredients: dishIngredients.map(ingredient => ingredient.ingredient_name)
            };
        });

        const groupedDishes = dishesWithIngredients.reduce((acc, dish) => {
            const category_name = dish.category_name;
            if (!acc[category_name]) {
                acc[category_name] = [];
            }
            acc[category_name].push(dish);
            return acc;
        }, {});

        return groupedDishes;
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

        if (ingredients.length > 0) {
            const ingredientsInsert = ingredients.map(ingredient => {
                return {
                    dishes_id: id,
                    name: ingredient.name
                };
            });

            await knex("ingredients").insert(ingredientsInsert);
        }

    }


    async findSalesOrderAndDishesById({ id }) {
        const sales_order_details = await knex("sales_order_details")
            .innerJoin("sales_order", "sales_order.id", "sales_order_details.sales_order_id")
            .innerJoin("dishes", "dishes.id", "sales_order_details.dishes_id")
            .where({ "sales_order_details.dishes_id": id })
            .select(
                "sales_order_details.id as sales_order_details_id",
                "sales_order_details.sales_order_id",
                "sales_order.user_id",
                "dishes.img"
            );
    
        return sales_order_details;
    }

    async deleteDishes({ id }) {
       await knex('dishes').delete().where({ id });

       return;
    }
}

module.exports = DishesRepository;



