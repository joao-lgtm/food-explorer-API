const knex = require('../database/knex');

class UserRepository {
    async findByEmail(email) {
        const user = await knex('users').where({ email }).first();
        return user;
    }

    async findById(id) {
        const user = await knex("users").where({ id }).first();
        return user;
    }

    async createUser({ name, email, password, street, neighborhood, number, city, uf, zipcode }) {
        const [userId] = await knex('users').insert({
            name,
            email,
            password,
        });

        await knex("address").insert({ street, neighborhood, number, city, uf, zipcode, user_id: userId });


    }

    async updateUser({ id, user }) {
        await knex('users').where({ id }).update(user);
    }

}

module.exports = UserRepository;
