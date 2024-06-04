const DiskStorage = require("../providers/DiskStorage");

class DishesCreateService {
    constructor(dishesRepository) {
        this.dishesRepository = dishesRepository;
    }

    async execute({ img, name, category_id, ingredients, price, description }) {
        const diskStorage = new DiskStorage();
        const fileName = await diskStorage.saveFile(img);

        const dishesCreated = await this.dishesRepository.createDishes({img: fileName, name, category_id, ingredients, price, description});

        return dishesCreated;
    }
}

module.exports = DishesCreateService;
