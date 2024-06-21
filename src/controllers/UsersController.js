const UserRepository = require("../repositories/UserRepository");
const UserService = require("../services/UserService");
const AppError = require("../utils/AppError");



class UserController {
    async create(request, response) {

        const { name, email, password, street, neighborhood, number, city, uf, zipcode } = request.body;

        if (!name || !email || !password || !street || !neighborhood || !number || !city || !uf || !zipcode) {
            throw new AppError("todos os campos são obrigatórios", 400);
        }

        const userRepository = new UserRepository();
        const userService = new UserService(userRepository);

        try {
            await userService.execute({ name, email, password, street, neighborhood, number, city, uf, zipcode });

            return response.status(201).json("usuario criado com sucesso");
        } catch (error) {
             return response.status(error.statusCode).json({error: error.message});
        }
    }


    async update(request, response) {
        const user_id = request.user.id;
        const { name, email, password, old_password, address, neighborhood, number, zipcode } = request.body;
        let avatarFileName;

        const userRepository = new UserRepository();
        const userService = new UserService(userRepository);

        if (request.file) {
            avatarFileName = request.file.filename;
        }
        
        try {
            await userService.update({ id: user_id, name, email, password, old_password, address, neighborhood, number, zipcode, avatarFileName })

            return response.status(200).json("usuario atualizado com sucesso");
        } catch (error) {
             return response.status(error.statusCode).json({error: error.message});
        }

    }

}


module.exports = UserController