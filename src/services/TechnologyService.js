import { Validations, ValidationError } from '../utils/Validations.js'; 

class TechnologyService {
    constructor(technologyRepository) {
        this.technologyRepository = technologyRepository;
        this.validations = Validations;    }

    async createTechnology(technologyDetails) {
        try {
            return technologyDetails.file
            // this.validations.validateFields([technologyDetails.name, technologyDetails.image]);
    
            // // technologyDetails.image = await this.imageUtils.saveImage(technologyDetails.image); 
            
            // const createdTechnologyData = await this.technologyRepository.create(technologyDetails);

            // const createdTechnology = createdTechnologyData.toObject();
    
            // return createdTechnology;
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(error.message);
            }
            throw error;
        }
    }

    async getTechnologyById(id) {
        return await this.technologyRepository.findById(id);
    }

    async getAllTechnologies() {
        return await this.technologyRepository.findAll();
    }

    async updateTechnology(id, updatedTechnologyData) {
        try {
            this.validations.validateFields(Object.values(updatedTechnologyData).filter(value => value !== undefined));
    
            if (updatedTechnologyData.image) {
                // updatedTechnologyData.image = await this.imageUtils.saveImage(updatedTechnologyData.image);
            }
    
            const updatedTechnology = await this.technologyRepository.update(id, updatedTechnologyData);
            
            return updatedTechnology;
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(error.message);
            }
            throw error;
        }
    }

    async deleteTechnology(id) {
        return await this.technologyRepository.delete(id);
    }

    async findTechnologiesByUserId(userId) {
        return await this.technologyRepository.findTechnologiesByUserId(userId);
    }
}

export default TechnologyService;
