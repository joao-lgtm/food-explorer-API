const DiskStorage = require("../providers/DiskStorage");
const AppError = require("../utils/AppError");

class DishesCreateService {
    constructor(dishesRepository) {
        this.dishesRepository = dishesRepository;
    }


    async index({ dishes_name, ingredients_name }) {
        const dishes = await this.dishesRepository.findByNameAndIngredients({ dishes_name, ingredients_name })

        return dishes;
    }

    async show({ id }) {
        try {
            const dishes = await this.dishesRepository.findById({ id });
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
        try {
            const diskStorage = new DiskStorage();
            const dishes = await this.dishesRepository.findById({ id });
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
            throw new Error("Erro ao atualizar prato: ", 500);
        }
    }

    async delete({ id }) {
        const diskStorage = new DiskStorage();
        const dishes = await this.dishesRepository.findById({ id });
        if (!dishes) {
            throw new AppError("Prato não encontrado", 404);
        }

        if (dishes.img) {
            await diskStorage.deleteFile(dishes.img);
        }

        const dishesDelete = await this.dishesRepository.deleteDishes({ id });

        return dishesDelete;
    }
}

module.exports = DishesCreateService;
