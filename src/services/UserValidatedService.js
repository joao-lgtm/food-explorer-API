const AppError = require("../utils/AppError");

class UserValidatedService {
    constructor(userValidatedRepository) {
        this.userValidatedRepository = userValidatedRepository;
    }

    async validated({ id }) {
        try {
            const user = await this.userValidatedRepository.findById({ id });

            if (!user) { 
                throw new AppError("Unauthorized", 401); 
            }

            return user; 

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Erro ao validar o usuário", 500);
        }
    }
}

module.exports = UserValidatedService;