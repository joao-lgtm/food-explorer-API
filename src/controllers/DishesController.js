const DishesRepository = require("../repositories/DishesRepository");
const DishesCreateService = require("../services/DishesCreateService");

class DishesController {
    async create(request, response) {
        const { name, category_id, price, description } = request.body;

        const ingredients = JSON.parse(request.body.ingredients);
        const img = request.file.filename;
        
        const dishesRepository = new DishesRepository();

        const dishesCreateService = new DishesCreateService(dishesRepository);

        await dishesCreateService.execute({ img, name, category_id, ingredients, price, description })

        return response.status(201).json();
    }

    async show(request, response) {
        const { id } = request.params;
        
        const dishesRepository = new DishesRepository();

        const dishesCreateService = new DishesCreateService(dishesRepository);

        const dishes = await dishesCreateService.show({ id })

        return response.status(200).json(dishes);
    }

    async index(request, response) {
        const { dishes_name, ingredients_name} = request.query;
        
        const dishesRepository = new DishesRepository();

        const dishesCreateService = new DishesCreateService(dishesRepository);

        const dishes = await dishesCreateService.index({ dishes_name, ingredients_name });

        return response.status(200).json(dishes);
    }


    async update(request, response) {
        const { name, category_id, price, description } = request.body;

        const ingredients = JSON.parse(request.body.ingredients);
        const img = request.file.filename;
        
        const dishesRepository = new DishesRepository();

        const dishesCreateService = new DishesCreateService(dishesRepository);

        await dishesCreateService.execute({ img, name, category_id, ingredients, price, description })

        return response.status(201).json();
    }

}

module.exports =  DishesController;