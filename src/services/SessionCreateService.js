class SessionCreateService {
    constructor(sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    async execute({ email, password }) {
        const sessionCreated = await this.sessionRepository.createSession(email, password);

        return sessionCreated;
    }
}

module.exports = SessionCreateService;
