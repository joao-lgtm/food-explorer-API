const UserValidatedRepository = require("../repositories/UserValidatedRepository");
const UserValidatedService = require("../services/UserValidatedService");

class UserValidatedController {
    async index(request, response) {
        const { user } = request;

        const userValidatedRepository = new UserValidatedRepository();
        const userValidatedService = new UserValidatedService(userValidatedRepository);

        try {
            await userValidatedService.validated({ id: user.id });

            return response.status(200).json({ message: "Usuário validado com sucesso" });

        } catch (error) {
            console.error("Erro na validação do usuário:", error);
            return response.status(error.statusCode || 500).json({ error: error.message });
        }
    }
}

module.exports = UserValidatedController;