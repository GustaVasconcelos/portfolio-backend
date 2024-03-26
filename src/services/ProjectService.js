import { Validations, ValidationError } from '../utils/Validations.js'; 

class ProjectService {
    constructor(ProjectRepository) {
        this.projectRepository = ProjectRepository;
        this.validations = Validations;
    }

    async createProject(ProjectDetails) {
        try {
            this.validations.validateFields([ProjectDetails.name]);

            const createdProjectData = await this.projectRepository.create(ProjectDetails);

            return createdProjectData.toObject();
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(error.message);
            }
            throw error;
        }
    }

    async getProjectById(id) {
        try {
            return await this.projectRepository.findById(id);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(error.message);
            }
            throw error;
        }
    }

    async getAllProjects() {
        try {
            return await this.projectRepository.findAll();
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(error.message);
            }
            throw error;
        }
    }

    async findProjectsByUserId(userId) {
        try {
            return await this.projectRepository.findProjectsByUserId(userId);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(error.message);
            }
            throw error;
        }
    }

    async updateProject(projectId, projectDetails) {
        try {
            this.validations.validateFields([projectId]);

            const existingProject = await this.projectRepository.findById(projectId);
            
            if (!existingProject) {
                throw new Error('Projeto não encontrado');
            }

            const updatedProject = await this.projectRepository.update(projectId, projectDetails);

            return updatedProject.toObject();
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(error.message);
            }
            throw error;
        }
    }

    async deleteProject(id) {
        try {
            return await this.projectRepository.delete(id);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(error.message);
            }
            throw error;
        }
    }
}

export default ProjectService;
