const { hash, compare } = require('bcryptjs');
const AppError = require('../utils/AppError');
const DiskStorage = require("../providers/DiskStorage")

class UserCreateService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute({ name, email, password, address,neighborhood, number, zipcode }) {
        const userExists = await this.userRepository.findByEmail(email);

        if (userExists) {
            throw new AppError('Usuario já existente');
        }

        const hashedPassword = await hash(password, 8);

        const user = await this.userRepository.createUser({
            name,
            email,
            password: hashedPassword,
            address,
            neighborhood,
            number,
            zipcode
        });

        return user;
    }

    async update({ id, name, email, password, old_password, address,neighborhood, number, zipcode, avatarFileName }) {
        const user = await this.userRepository.findById(id);

        const diskStorage = new DiskStorage();

        if (!user) {
            throw new AppError("Somente usuários autenticado podem mudar o avatar", 401)
        }

        if (email) {
            const userWithUpdateEmail = await this.userRepository.findByEmail(email);

            if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
                throw new AppError("Este e-mail já está em uso.");
            }
        }

        if (password && !old_password) {
            throw new AppError("Você precisa informar a senha antiga para definir a nova senha")
        }

        if (password && old_password) {
            const checkOldpassword = await compare(old_password, user.password)

            if (!checkOldpassword) {
                throw new AppError("A senha antiga não confere.")
            }

            user.password = await hash(password, 8)
        }

        if (user.avatar) {
            await diskStorage.deleteFile(user.avatar);
        }
        const fileName = await diskStorage.saveFile(avatarFileName);

        user.name = name ? name : user.name;
        user.email = email ? email : user.email;
        user.address = address ? address : user.address;
        user.number = number ? number : user.number;
        user.zipcode = zipcode ? zipcode : user.zipcode;
        user.neighborhood = neighborhood ? neighborhood : user.neighborhood;
        user.avatar = fileName ? fileName : user.avatar;

        await this.userRepository.updateUser({
            id, user
        })

    }
}

module.exports = UserCreateService;
