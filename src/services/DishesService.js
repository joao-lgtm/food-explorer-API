const DiskStorage = require("../providers/DiskStorage");
const AppError = require("../utils/AppError");

class DishesService {
    constructor(dishesRepository) {
        this.dishesRepository = dishesRepository;
    }


    async index({ dishes_name, ingredients_name }) {
        const dishes = await this.dishesRepository.findByNameAndIngredients({ dishes_name, ingredients_name })

        if (!dishes.length) {
            throw new AppError("Nenhum prato encontrado", 404);
        }

        try {
            return dishes
        } catch (error) {
            throw new AppError("Erro ao buscar os prato", 400);
        }
    }

    async show({ id }) {
        const dishes = await this.dishesRepository.findById({ id });

        if (!dishes) {
            throw new AppError("Nenhum prato encontrado", 404);
        }

        try {
            return dishes;
        } catch (error) {
            throw new AppError("Erro ao buscar prato", 404);
        }
    }

    async execute({ img, name, category_id, ingredients, price, description }) {
        try {
            const diskStorage = new DiskStorage();
            const fileName = await diskStorage.saveFile(img);
            const dishesCreated = await this.dishesRepository.createDishes({ img: fileName, name, category_id, ingredients, price, description });
            return dishesCreated;
        } catch (error) {
            throw new AppError("Erro ao criar prato", 400);
        }
    }

    async update({ id, img, name, category_id, ingredients, price, description }) {
        const dishes = await this.dishesRepository.findById({ id });

        if (!dishes) {
            throw new AppError("Prato Informado não encontrado encontrado", 404);
        }

        try {
            const diskStorage = new DiskStorage();

            let fileName;

            if (img != null || img != undefined || img != '' || "") {
                if (dishes.img) {
                    await diskStorage.deleteFile(dishes.img);
                }
                fileName = await diskStorage.saveFile(img);
            } else {
                fileName = dishes.img;
            }

            const dishesUpdate = await this.dishesRepository.updateDishes({ id, img: fileName, name, category_id, ingredients, price, description });

            return dishesUpdate;
        } catch (error) {
            throw new AppError("Erro ao atualizar o prato", 400);
        }
    }

    async delete({ id }) {
        const diskStorage = new DiskStorage();
        const dishes = await this.dishesRepository.findById({ id });

        if (!dishes) {
            throw new AppError("Prato não encontrado", 404);
        }

        try {
            if (dishes.img) {
                await diskStorage.deleteFile(dishes.img);
            }

            const dishesDelete = await this.dishesRepository.deleteDishes({ id });

            return dishesDelete;
        } catch (error) {
            throw new AppError("Erro ao deletar o prato", 400);
        }

    }
}

module.exports = DishesService;
