class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async getAllCategorys() {
        try {
            const categorys = await this.categoryRepository.findAll();

            if (!categorys) {
                throw new AppError("Não há categorias existentes", 404);
            }
            return categorys;

        } catch (error) {
            throw new AppError( "Erro ao buscar os categorias", 400);
        }
    }
}

module.exports = CategoryService