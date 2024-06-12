const IngredientsRepository = require("../repositories/IngredientsRepository");
const IngredientsService = require("../services/IngredientsService");
const AppError = require("../utils/AppError");



class IngredientsController {
    async delete(request, response) {
        try {
            const { id } = request.params;
            const ingredientsRepository = new IngredientsRepository();
            const ingredientsService = new IngredientsService(ingredientsRepository);

            await ingredientsService.delete({ id })

            return response.status(200).json("Ingrediente deletado");
        } catch (error) {
            throw new AppError("Erro ao deletar ingrediente" , 500);
        }
    }
}


module.exports = IngredientsController;