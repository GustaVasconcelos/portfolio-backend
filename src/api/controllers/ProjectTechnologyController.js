class ProjectTechnologyController {
    constructor(projectTechnologyService, firebaseStorageService) {
        this.projectTechnologyService = projectTechnologyService;
        this.firebaseStorageService = firebaseStorageService;
    }

    createProjectTechnology = async (req, res) => {
        try {
            const ProjectTechnologyDetails = req.body;

            const projectImage = await this.projectImageService.createProjectTechnology( ProjectTechnologyDetails);

            res.status(201).json(projectImage);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    };

    getProjectProjectTechnologyId = async (req, res) => {
        try {
            const projectTechnologyId = req.params.id;
            const projectTechnology = await this.projectTechnologyService.getProjectTechnologyById(projectTechnologyId);

            if (!projectTechnology) {
                res.status(404).json({ message: 'Tecnologia do projeto não encontrada' });
                return;
            }

            res.status(200).json(projectTechnology);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    };

    getAllProjectTechnology = async (req, res) => {
        try {
            const projectTechnology = await this.projectTechnologyService.getAllProjectTechnologys();
            res.status(200).json(projectTechnology);
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    };

    getProjectTechnologyByProjectId = async (req, res) => {
        try {
            const ProjectId = req.params.id;

            const ProjectTechnology = await this.projectTechnologyService.findProjectTechnologiesByProjectId(ProjectId);

            if (!ProjectTechnology) {
                res.status(404).json({ message: 'Tecnologia do projeto não encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    updateProjectTechnology = async (req, res) => {
        try {
            const projectTechnologyId = req.params.id;
            const projectTechnologyDetails = req.body;

            const updatedProjectTechnology = await this.projectTechnologyService.updateProjectTechnology(projectTechnologyId, projectTechnologyDetails);
            res.status(200).json(updatedProjectTechnology);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    };

    deleteProjectTechnology = async (req, res) => {
        try {
            const projectTechnologyId = req.params.id;
            await this.projectTechnologyService.deleteProjectTechnology(projectTechnologyId);
            res.status(204).send();
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    };
}

export default ProjectTechnologyController;
