class ProjectImageController {
    constructor(projectImageService, firebaseStorageService) {
        this.projectImageService = projectImageService;
        this.firebaseStorageService = firebaseStorageService;
    }

    createProjectImage = async (req, res) => {
        try {
            const { projectId } = req.body;

            if (!req.file) {
                res.status(400).json({ error: 'Nenhuma imagem fornecida' });
                return;
            }

            const imageUrl = await this.firebaseStorageService.uploadFile(req.file);
            
            const projectImageDetails = {
                imageUrl: imageUrl,
                projectId: projectId
            };

            const projectImage = await this.projectImageService.createProjectImage(projectImageDetails);

            res.status(201).json(projectImage);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    };

    getProjectImageById = async (req, res) => {
        try {
            const projectImageId = req.params.id;
            const projectImage = await this.projectImageService.getProjectImageById(projectImageId);

            if (!projectImage) {
                res.status(404).json({ message: 'Imagem do projeto não encontrada' });
                return;
            }

            res.status(200).json(projectImage);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    };
    
    getProjectImagesByProjectId = async (req, res) => {
        try {
            const projectId = req.params.id;

            const projectImages = await this.projectImageService.findProjectImagesByProjectId(projectId);

            if (!projectImages) {
                res.status(404).json({ message: 'Nenhuma imagem encontrada' });
            }

            res.status(200).json(projectImages);
        } catch(error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    }

    getAllProjectImages = async (req, res) => {
        try {
            const projectImages = await this.projectImageService.getAllProjectImages();
            res.status(200).json(projectImages);
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    };

    updateProjectImage = async (req, res) => {
        try {
            const projectImageId = req.params.id;
            const projectImageDetails = req.body;

            if (req.file) {
                projectImageDetails.imageUrl = await this.firebaseStorageService.uploadFile(req.file);
            }

            const updatedProjectImage = await this.projectImageService.updateProjectImage(projectImageId, projectImageDetails);
            res.status(200).json(updatedProjectImage);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    };

    deleteProjectImage = async (req, res) => {
        try {
            const projectImageId = req.params.id;
            await this.projectImageService.deleteProjectImage(projectImageId);
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

export default ProjectImageController;
