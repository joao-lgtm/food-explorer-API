const UserRepository = require("../repositories/UserRepository");
const UserCreateService = require("../services/UserCreateService");



class UserController {
    async create(request, response) {
        const { name, email, password, address,neighborhood, number, zipcode } = request.body;

        const userRepository = new UserRepository();

        const userCreateService = new UserCreateService(userRepository);

        await userCreateService.execute({ name, email, password, address,neighborhood, number, zipcode })

        return response.status(201).json();
    }


    async update(request, response) {
        const user_id = request.user.id;
        const { name, email, password, old_password, address, neighborhood , number, zipcode } = request.body;
        let avatarFileName;

        const userRepository = new UserRepository();
        const userCreateService = new UserCreateService(userRepository);

        if (request.file) {
            avatarFileName = request.file.filename;
        }

        await userCreateService.update({ id: user_id, name, email, password, old_password, address, neighborhood, number, zipcode, avatarFileName })

        return response.status(200).json();
    }

}


module.exports = UserController