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

}

module.exports =  DishesController;