const DishesRepository = require("../repositories/DishesRepository");
const DishesCreateService = require("../services/DishesCreateService");
const AppError = require("../utils/AppError");

class DishesController {
    async create(request, response) {
        try {
            const { name, category_id, price, description } = request.body;
            const ingredients = JSON.parse(request.body.ingredients);
            const img = request.file.filename;

            if (!name || !category_id || !price || !description || !ingredients || !img) {
                throw new AppError("Todos os Campos são Obrigatorios", 400);
            }

            const dishesRepository = new DishesRepository();
            const dishesCreateService = new DishesCreateService(dishesRepository);

            await dishesCreateService.execute({ img, name, category_id, ingredients, price, description })

            return response.status(201).json();

        }
        catch (error) {
            return response.status(error.statusCode).json(error.message);
        }
    }




    async show(request, response) {
        try {
            const { id } = request.params;

            const dishesRepository = new DishesRepository();
            const dishesCreateService = new DishesCreateService(dishesRepository);

            const dishes = await dishesCreateService.show({ id });

            if (!dishes) {
                throw new AppError("Prato não encontrado", 404);
            }

            return response.status(200).json(dishes);

        } catch (error) {
            return response.status(error.statusCode).json(error.message);
        }
    }

    async index(request, response) {
        const { dishes_name, ingredients_name } = request.query;

        const dishesRepository = new DishesRepository();

        const dishesCreateService = new DishesCreateService(dishesRepository);

        const dishes = await dishesCreateService.index({ dishes_name, ingredients_name });

        return response.status(200).json(dishes);
    }


    async update(request, response) {
        const { id, name, category_id, price, description } = request.body;
        const ingredients = JSON.parse(request.body.ingredients);
        const img = request.file.filename;

        const dishesRepository = new DishesRepository();

        const dishesCreateService = new DishesCreateService(dishesRepository);

        await dishesCreateService.update({ id, img, name, category_id, ingredients, price, description })

        return response.status(200).json();
    }

    async delete(request, response) {
        const { id } = request.params;

        const dishesRepository = new DishesRepository();

        const dishesCreateService = new DishesCreateService(dishesRepository);

        await dishesCreateService.delete({ id })

        return response.status(200).json();
    }


}

module.exports = DishesController;