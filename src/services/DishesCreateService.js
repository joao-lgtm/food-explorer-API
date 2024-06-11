const DiskStorage = require("../providers/DiskStorage");

class DishesCreateService {
    constructor(dishesRepository) {
        this.dishesRepository = dishesRepository;
    }


    async index({ dishes_name, ingredients_name }) {
        const dishes = await this.dishesRepository.findByNameAndIngredients({ dishes_name, ingredients_name })

        return dishes;
    }

    async show({ id }) {
        const dishes = await this.dishesRepository.findById({ id });
        return dishes;
    }

    async execute({ img, name, category_id, ingredients, price, description }) {
        const diskStorage = new DiskStorage();
        const fileName = await diskStorage.saveFile(img);

        const dishesCreated = await this.dishesRepository.createDishes({ img: fileName, name, category_id, ingredients, price, description });

        return dishesCreated;
    }

    async update({ id, img, name, category_id, ingredients, price, description }) {
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
    }

    async delete({ id }) {
        const diskStorage = new DiskStorage();
        const dishes = await this.dishesRepository.findById({ id });

        if (dishes.img) {
            await diskStorage.deleteFile(dishes.img);
        }

        const dishesDelete = await this.dishesRepository.deleteDishes({ id });

        return dishesDelete;
    }
}

module.exports = DishesCreateService;
