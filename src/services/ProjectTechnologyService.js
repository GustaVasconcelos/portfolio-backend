import { Validations, ValidationError } from '../utils/Validations.js'; 

class ProjectTechnologyService {
    constructor(ProjectTechnologyRepository) {
        this.projectTechnologyRepository = ProjectTechnologyRepository;
        this.validations = Validations;
    }

    async createProjectTechnology(ProjectTechnologyDetails) {
        try {
            this.validations.validateFields([ProjectTechnologyDetails.TechnologyId, ProjectTechnologyDetails.projectId]);

            const createdProjectTechnologyData = await this.projectTechnologyRepository.create(ProjectTechnologyDetails);

            return createdProjectTechnologyData.toObject();
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(error.message);
            }
            throw error;
        }
    }

    async getProjectTechnologyById(id) {
        try {
            return await this.projectTechnologyRepository.findById(id);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(error.message);
            }
            throw error;
        }
    }

    async getAllProjectTechnologys() {
        try {
            return await this.projectTechnologyRepository.findAll();
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(error.message);
            }
            throw error;
        }
    }

    async findProjectTechnologiesByProjectId(projectId) {
        try {
            return await this.projectTechnologyRepository.findProjectTechnologiesByProjectId(projectId);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(error.message);
            }
            throw error;
        }
    }

    async updateProjectTechnology(projectTechnologyId, projectTechnologyDetails) {
        try {
            this.validations.validateFields([projectTechnologyDetails.TechnologyId]);

            const existingProjectTechnology = await this.projectTechnologyRepository.findById(projectTechnologyId);
            
            if (!existingProjectTechnology) {
                throw new Error('Tecnologia do projeto não encontrada');
            }

            const updatedProjectTechnology = await this.projectTechnologyRepository.update(projectTechnologyId, projectTechnologyDetails);

            return updatedProjectTechnology.toObject();
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(error.message);
            }
            throw error;
        }
    }

    async deleteProjectTechnology(id) {
        try {
            return await this.projectTechnologyRepository.delete(id);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(error.message);
            }
            throw error;
        }
    }
}

export default ProjectTechnologyService;
