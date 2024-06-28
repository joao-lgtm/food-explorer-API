const { compare } = require("bcryptjs");
const SessionService = require("../services/SessionService");
const SessionRepository = require("../repositories/SessionRepository");

class SessionController {
    async create(request, response) {
        const { email, password } = request.body;

        const sessionRepository = new SessionRepository();
        const sessionService = new SessionService(sessionRepository);

        try {
            const Session = await sessionService.execute({ email, password });

            response.cookie("token", Session.token, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 15 * 60 * 1000
            });

            response.status(201).json({ user: Session.user });
        } catch (error) {
            return response.status(error.statusCode).json({ error: error.message });
        }
    }

    async delete(request, response){
            try {
                response.clearCookie("token", {
                    path: '/', // Certifique-se de que o caminho está correto
                    domain: 'localhost' // Ajuste conforme necessário
                });
    
                return response.status(200).json({ message: "Cookie removido com sucesso" });
            } catch (error) {
                console.error("Erro ao limpar o cookie:", error);
                return response.status(500).json({ error: "Erro ao limpar o cookie" });
            }
    }
}

module.exports = SessionController;