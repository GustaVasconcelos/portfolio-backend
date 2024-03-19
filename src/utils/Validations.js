import validator from 'validator';
import UserRepository from '../repositories/UserRepository.js'; 

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

class Validations {
    static userRepository = new UserRepository();

    static validateEmail(email) {
        if (!validator.isEmail(email)) throw new ValidationError('E-mail inválido');
    }

    static validateFields(fields) {
        const emptyFields = fields.filter(field => typeof field !== 'string' || !field.trim());
    
        if (emptyFields.length > 0) {
            throw new ValidationError('Um ou mais campos estão vazios');
        }
    }

    static validatePassword(password, confirmPassword) {
        if (password !== confirmPassword) {
            throw new ValidationError('As senhas não coincidem');
        }
    }

    static async validateExistingEmail(email) {
        const existingUser = await Validations.userRepository.findByEmail(email);

        if (existingUser) throw new ValidationError('E-mail já cadastrado');

        return null;
    }

    static validateAtLeastOneFieldFilled(fieldsToCheck, object) {
        const isAnyFieldFilled = fieldsToCheck.some(field => Boolean(object[field]));

        if (!isAnyFieldFilled) {
            throw new ValidationError('Pelo menos um campo deve ser preenchido');
        }
    }
}

export { ValidationError, Validations };
