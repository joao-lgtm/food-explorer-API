const IngredientsRepository = require("../repositories/IngredientsRepository");
const IngredientsService = require("../services/IngredientsService");
const AppError = require("../utils/AppError");



class IngredientsController {
    async delete(request, response) {
        const { id } = request.params;
        
        const ingredientsRepository = new IngredientsRepository();
        const ingredientsService = new IngredientsService(ingredientsRepository);

        try {
            await ingredientsService.delete({ id })

            return response.status(200).json("Ingrediente deletado");
        } catch (error) {
             return response.status(error.statusCode).json({error: error.message});
        }
    }
}


module.exports = IngredientsController;