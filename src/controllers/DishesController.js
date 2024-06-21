const DishesRepository = require("../repositories/DishesRepository");
const DishesService = require("../services/DishesService");
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
             return response.status(error.statusCode).json({error: error.message});
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
             return response.status(error.statusCode).json({error: error.message});
        }
    }

    async index(request, response) {
        const { dishes_name, ingredients_name } = request.query;

        const dishesRepository = new DishesRepository();
        const dishesService = new DishesService(dishesRepository);

        try {
            const dishes = await dishesService.index({ dishes_name, ingredients_name });

            return response.status(200).json(dishes);
        } catch (error) {
             return response.status(error.statusCode).json({error: error.message});
        }
    }


    async update(request, response) {
        const { id, name, category_id, price, description } = request.body;
        const ingredients = JSON.parse(request.body.ingredients);
        const img = request.file.filename;

        const dishesRepository = new DishesRepository();
        const dishesService = new DishesService(dishesRepository);

        try {
            await dishesService.update({ id, img, name, category_id, ingredients, price, description })

            return response.status(200).json();
        } catch (error) {
             return response.status(error.statusCode).json({error: error.message});
        }
    }

    async delete(request, response) {
        const { id } = request.params;

        const dishesRepository = new DishesRepository();
        const dishesService = new DishesService(dishesRepository);

        try {
            await dishesService.delete({ id })

            return response.status(200).json();
        } catch (error) {
             return response.status(error.statusCode).json({error: error.message});
        }
    }


}

module.exports = DishesController;