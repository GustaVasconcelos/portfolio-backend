class TechnologyController {
    constructor(technologyService) {
        this.technologyService = technologyService;
    }

    createTechnology = async (req, res) => {
        try {
            const technologyDetails = req.body;

            technologyDetails.image = req.file.filename;
            technologyDetails.userId = req.userId;

            const technology = await this.technologyService.createTechnology(technologyDetails);

            res.status(201).json(technology);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    };

    getTechnologies = async (req, res) => {
        try {
            const technologies = await this.technologyService.getAllTechnologies();
            res.status(200).json(technologies);
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    };

    getTechnology = async (req, res) => {
        try {
            const technologyId = req.params.id;
            const technology = await this.technologyService.getTechnologyById(technologyId);
            if (!technology) {
                res.status(404).json({ message: 'Tecnologia não encontrada' });
                return;
            }
            res.status(200).json(technology);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    };

    updateTechnology = async (req, res) => {
        try {
            const technologyId = req.params.id;
            const updatedTechnologyData = req.body;

            updatedTechnologyData.image = req.file.filename;

            const updatedTechnology = await this.technologyService.updateTechnology(technologyId, updatedTechnologyData);
            res.status(200).json(updatedTechnology);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    };

    deleteTechnology = async (req, res) => {
        try {
            const technologyId = req.params.id;
            await this.technologyService.deleteTechnology(technologyId);
            res.status(204).end();
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    };

    getTechnologiesByUser = async (req, res) => {
        try {
            const userId = req.userId; // Assumindo que este é um campo injetado por um middleware de autenticação anterior
            const technologies = await this.technologyService.findTechnologiesByUserId(userId);
            res.status(200).json(technologies);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor.' });
            }
        }
    };
}

export default TechnologyController;
