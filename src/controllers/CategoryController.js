const CategoryRepository = require("../repositories/CategoryRepository");
const CategoryService = require("../services/CategoryService");


class CategoryController {
    async index(request, response) {
        const categoryRepository = new CategoryRepository();
        const categoryService = new CategoryService(categoryRepository);

        try {
            const category = await categoryService.getAllCategorys();

            return response.status(200).json(category)
        } catch (error) {
            return response.status(error.statusCode).json({ error: error.message });
        }
    }


}


module.exports = CategoryController;