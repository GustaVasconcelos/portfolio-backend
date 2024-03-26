class ProjectController {
    constructor(projectService, firebaseStorageService) {
        this.projectService = projectService;
        this.firebaseStorageService = firebaseStorageService;
    }

    createProject = async (req, res) => {
        try {
            const projectDetails = req.body;

            if (req.files && req.files.screenshots) {
                const uploadPromises = req.files.screenshots.map(file => this.firebaseStorageService.uploadFile(file));
                projectDetails.screenshots = await Promise.all(uploadPromises);
            }

            projectDetails.userId = req.userId;

            const project = await this.projectService.createProject(projectDetails);

            res.status(201).json(project);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    };

    getProjects = async (req, res) => {
        try {
            const projects = await this.projectService.getAllProjects();

            res.status(200).json(projects);
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    };

    getProject = async (req, res) => {
        try {
            const projectId = req.params.id;

            const project = await this.projectService.getProjectById(projectId);

            if (!project) {
                res.status(404).json({ message: 'Projeto não encontrado' });

                return;
            }

            res.status(200).json(project);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    };

    updateProject = async (req, res) => {
        try {
            const projectId = req.params.id;
            const updatedProjectData = req.body;

            if (req.files && req.files.screenshots) {
                const uploadPromises = req.files.screenshots.map(file => this.firebaseStorageService.uploadFile(file));
                updatedProjectData.screenshots = await Promise.all(uploadPromises);
            }

            const updatedProject = await this.projectService.updateProject(projectId, updatedProjectData);
            res.status(200).json(updatedProject);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    };

    deleteProject = async (req, res) => {
        try {
            const projectId = req.params.id;

            await this.projectService.deleteProject(projectId);

            res.status(204).end();
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    };

    getProjectsByUser = async (req, res) => {
        try {
            const userId = req.userId;

            const projects = await this.projectService.findProjectsByUserId(userId);

            res.status(200).json(projects);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor.' });
            }
        }
    };
}

export default ProjectController;
