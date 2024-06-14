const UserRepository = require("../repositories/UserRepository");
const UserCreateService = require("../services/UserCreateService");
const AppError = require("../utils/AppError");



class UserController {
    async create(request, response) {
        try {
            const { name, email, password, street, neighborhood, number, city, uf, zipcode } = request.body;
    
            if (!name || !email || !password || !street || !neighborhood || !number || !city || !uf || !zipcode) {
                throw new AppError("todos os campos são obrigatórios", 400);
            }
    
            const userRepository = new UserRepository();
            const userCreateService = new UserCreateService(userRepository);
    
            await userCreateService.execute({ name, email, password, street, neighborhood, number, city, uf, zipcode });
    
            return response.status(201).json("usuario criado com sucesso");
        } catch (error) {
            const statusCode = error.statusCode || 500;
            const message  = error.message || "Erro interno do servidor";
            return response.status(statusCode).json({ message:  message});
        }
    }


    async update(request, response) {
        try {
            const user_id = request.user.id;
            const { name, email, password, old_password, address, neighborhood, number, zipcode } = request.body;
            let avatarFileName;
    
            const userRepository = new UserRepository();
            const userCreateService = new UserCreateService(userRepository);
    
            if (request.file) {
                avatarFileName = request.file.filename;
            }
    
            await userCreateService.update({ id: user_id, name, email, password, old_password, address, neighborhood, number, zipcode, avatarFileName })
    
            return response.status(200).json("usuario atualizado com sucesso");
        } catch (error) {
            return response.status(500).json("Erro interno do servidor" );
        }
      
    }

}


module.exports = UserController