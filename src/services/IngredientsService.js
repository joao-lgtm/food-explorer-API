const AppError = require("../utils/AppError");

class IngredientsService {
    constructor(ingredientsRepository) {
        this.ingredientsRepository = ingredientsRepository;
    }

    async delete({ id }) {
        const ingredientsExists = await this.ingredientsRepository.findById({ id });

        if (!ingredientsExists) {
            throw new AppError("Ingrediente não existe", 404);
        }
        try {
            const ingredientsDelete = await this.ingredientsRepository.deleteById({ id });
            return ingredientsDelete;
        } catch (error) {
            throw new AppError("Erro ao buscar detalhe", 400);
        }
    }
}

module.exports = IngredientsService;