const { compare } = require("bcryptjs");
const SessionService = require("../services/SessionService");
const SessionRepository = require("../repositories/SessionRepository");

class SessionController {
    async create(request, response) {
        const { email, password } = request.body;

        const sessionRepository = new SessionRepository();
        const sessionService = new SessionService(sessionRepository);

        const Session = await sessionService.execute({ email, password });

        response.cookie("token", Session.token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 15 * 60 * 1000
        });


        response.status(201).json({ user: Session.user });
    }
}

module.exports = SessionController;