const knex = require('../database/knex');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const authConfig = require('../configs/auth');

class SessionRepository {
    async createSession(email, password) {
        const user = await knex('users').where({ email }).first();
        if (!user) {
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

       
    const token = sign({ role: user.role}, secret, {
        subject: String(user.id),
        expiresIn
      });
  
    
      delete user.password;
       
      return { user, token };
    }
}

module.exports = SessionRepository;
