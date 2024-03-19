import BaseRepository from './BaseRepository.js';
import UserModel from '../models/User.js';

class UserRepository extends BaseRepository {
    constructor() {
        super(UserModel);
    }

    async findByEmail(email) {
        return this.model.findOne({ email }).exec();
    }

    async findByCpf(cpf) {
        return this.model.findOne({ cpf }).exec();
    }
}

export default UserRepository;
