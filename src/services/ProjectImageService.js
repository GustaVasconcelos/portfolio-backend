import { Validations, ValidationError } from '../utils/Validations.js'; 

class ProjectImageService {
    constructor(ProjectImageRepository) {
        this.projectImageRepository = ProjectImageRepository;
        this.validations = Validations;
    }

    async createProjectImage(ProjectImageDetails) {
        try {
            this.validations.validateFields([ProjectImageDetails.imageUrl, ProjectImageDetails.projectId]);

            const createdProjectImageData = await this.projectImageRepository.create(ProjectImageDetails);

            return createdProjectImageData.toObject();
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(error.message);
            }
            throw error;
        }
    }

    async getProjectImageById(id) {
        try {
            return await this.projectImageRepository.findById(id);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(error.message);
            }
            throw error;
        }
    }

    async getAllProjectImages() {
        try {
            return await this.projectImageRepository.findAll();
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(error.message);
            }
            throw error;
        }
    }

    async findProjectImagesByProjectId(projectId) {
        try {
            return await this.projectImageRepository.findProjectImagesByProjectId(projectId);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(error.message);
            }
            throw error;
        }
    }

    async updateProjectImage(projectImageId, projectImageDetails) {
        try {
            this.validations.validateFields([projectImageId]);

            const existingProjectImage = await this.projectImageRepository.findById(projectImageId);
            
            if (!existingProjectImage) {
                throw new Error('Imagem do projeto não encontrada');
            }

            const updatedProjectImage = await this.projectImageRepository.update(projectImageId, projectImageDetails);

            return updatedProjectImage.toObject();
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(error.message);
            }
            throw error;
        }
    }

    async deleteProjectImage(id) {
        try {
            return await this.projectImageRepository.delete(id);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(error.message);
            }
            throw error;
        }
    }
}

export default ProjectImageService;
