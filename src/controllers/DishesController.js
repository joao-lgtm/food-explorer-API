const DishesRepository = require("../repositories/DishesRepository");
const DishesService = require("../services/DishesService");
const SalesOrderService = require("../services/SalesOrderService");
const SalesOrderRepository = require("../repositories/SalesOrderRepository");
const SalesOrderDetailsService = require("../services/SalesOrderDetailsService");
const SalesOrderDetailsRepository = require("../repositories/SalesOrderDetailsRepository");

const AppError = require("../utils/AppError");

class DishesController {
    async create(request, response) {
        const { name, category_id, price, description } = request.body;
        const ingredients = JSON.parse(request.body.ingredients);
        const img = request.file.filename;

        if (!name || !category_id || !price || !description || !ingredients || !img) {
            throw new AppError("Todos os Campos são Obrigatorios", 400);
        }

        const dishesRepository = new DishesRepository();
        const dishesService = new DishesService(dishesRepository);

        try {
            await dishesService.execute({ img, name, category_id, ingredients, price, description })

            return response.status(201).json();

        }
        catch (error) {
            return response.status(error.statusCode).json({ error: error.message });
        }
    }




    async show(request, response) {
        const { id } = request.params;

        const dishesRepository = new DishesRepository();
        const dishesService = new DishesService(dishesRepository);

        try {
            const dishes = await dishesService.show({ id });
            return response.status(200).json(dishes);

        } catch (error) {
            return response.status(error.statusCode).json({ error: error.message });
        }
    }

    async index(request, response) {
        const { disher_ingredients } = request.query;

        const dishesRepository = new DishesRepository();
        const dishesService = new DishesService(dishesRepository);

        try {
            const dishes = await dishesService.index({ disher_ingredients });

            const convertObjectToArray = (obj) => {
                const arrayValue = [];

                Object.keys(obj).forEach(key => {
                    arrayValue.push({ key, value: obj[key] });
                })
                return arrayValue;
            }

            const objectToArray = convertObjectToArray(dishes);

            return response.status(200).json(objectToArray);
        } catch (error) {
            return response.status(error.statusCode).json({ error: error.message });
        }
    }


    async update(request, response) {
        const { id, name, category_id, price, description } = request.body;
        const ingredients = JSON.parse(request.body.ingredients);
        const img = request.file != undefined || null ? request.file.filename : "";

        const dishesRepository = new DishesRepository();
        const dishesService = new DishesService(dishesRepository);

        try {
            await dishesService.update({ id, img, name, category_id, ingredients, price, description })

            return response.status(200).json();
        } catch (error) {
            return response.status(error.statusCode).json({ error: error.message });
        }
    }

    async delete(request, response) {
        const { id } = request.params;

        const dishesRepository = new DishesRepository();
        const dishesService = new DishesService(dishesRepository);

        const salesOrderDetailsRepository = new SalesOrderDetailsRepository();
        const salesOrderDetailsService = new SalesOrderDetailsService(salesOrderDetailsRepository);

        const dishers = await dishesService.findIds({ id });

        if (dishers.length > 0) {
            await Promise.all(dishers.map(async (disher) => {
                await salesOrderDetailsService.deleteById({ sales_order_id: disher.sales_order_id, detail_id: disher.sales_order_details_id, user_id: disher.user_id });
            }));

            await dishesService.delete({ id, img: dishers[0].img });

            return response.status(200).json();
        } else {
            const disherNotOrders = await dishesService.show({ id });

            await dishesService.delete({ id, img: disherNotOrders.img });

            return response.status(200).json();
        }
    }
}

module.exports = DishesController;