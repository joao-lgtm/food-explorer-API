const AppError = require("../utils/AppError");

class SessionService {
    constructor(sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    async execute({ email, password }) {
        try {
            const sessionCreated = await this.sessionRepository.createSession(email, password);

            return sessionCreated;
        }
        catch (error) {
            throw new AppError(error.message, 401);
        }
    }
}

module.exports = SessionService;
