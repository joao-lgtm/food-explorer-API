class IngredientsService {
    constructor(ingredientsRepository) {
        this.ingredientsRepository = ingredientsRepository;
    }

    async delete({ id }) {
        const ingredientsDelete = await this.ingredientsRepository.deleteById({ id });

        return ingredientsDelete;
    }
}

module.exports = IngredientsService;