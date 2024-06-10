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

    // async update({id, img, name, category_id, ingredients, price, description }) {
    //     const diskStorage = new DiskStorage();

    //     const user = await this.userRepository.findById(id);
    //     const fileName = await diskStorage.saveFile(img);


    //     return dishesCreated;
    // }
}

module.exports = DishesCreateService;
