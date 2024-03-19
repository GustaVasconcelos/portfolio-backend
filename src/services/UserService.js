import { Validations, ValidationError } from '../utils/Validations.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.validations = Validations;
    }

    async registerUser(userDetails, confirmPassword) {
        try {
            this.validations.validateFields([userDetails.name, userDetails.email, userDetails.password, confirmPassword]);

            this.validations.validateEmail(userDetails.email);

            this.validations.validatePassword(userDetails.password, confirmPassword);

            await this.validations.validateExistingEmail(userDetails.email);

            return await this.userRepository.create(userDetails);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(error.message); 
            } 

            throw error; 
        }
    }  
    
    async getAllUsers() {
        return this.userRepository.findAll();
    }

    async getUserById(userId) {
        const user = await this.userRepository.findById(userId);
        
        if (!user) {
            throw new Error('Usuário não encontrado!');
        }
    
        return user;
    }

    async deleteUser(userId) {
        try {
            const userDeleted = await this.userRepository.delete(userId);

            if (!userDeleted) {
                throw new Error('Usuário não encontrado ou já foi deletado');
            }
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(error.message); 
            } 
            throw error; 
        }
    }

    async updateUser(userId, userDetails) {
        try {
            const fieldsToUpdate = Object.keys(userDetails);

            this.validations.validateFields(fieldsToUpdate);

            const updatedUser = await this.userRepository.update(userId, userDetails);

            if (!updatedUser) {
                throw new Error('Falha ao atualizar o usuário');
            }

            return updatedUser;
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(error.message);
            }

            throw error;
        }
    }

    async authenticate(email, password) {
        const user = await this.userRepository.findByEmail(email);
    
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) {
            throw new Error('Senha inválida');
        }
    
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error('Chave secreta JWT não definida');
        }
    
        return jwt.sign({ userId: user._id, userEmail: user.email }, secret, { expiresIn: '24h' });
    }
}

export default UserService;
