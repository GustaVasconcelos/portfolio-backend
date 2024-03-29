class CertificateController {
    constructor (certificateService) {
        this.certificateService = certificateService;
    }

    getAllCertificates = async (req, res) => {
        try {
            const certificates = await this.certificateService.getAllCertificates();

            return res.status(200).json(certificates);
        } catch(error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    }

    getCertificateById = async (req, res) => {
        try {
            const certificateId = req.params.id;

            const certificate = await this.certificateService.getCertificateById(certificateId);

            return res.status(200).json(certificate);
        } catch(error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    }

    findCertificatesByUserId = async (req, res) => {
        try {
            const userId = req.userId;

            const certificates = await this.certificateService.findCertificatesByUserId(userId);

            return res.status(200).json(certificates);
        } catch(error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    }

    createCertificate = async (req, res) => {
        try {
            const certificateDetails = req.body;

            const certificate = await this.certificateService.createCertificate(certificateDetails);

            res.status(201).json(certificate);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    };

    updateCertificate = async (req, res) => {
        try {
            const certificateId = req.params.id
            const certificateDetails = req.body;

            const updatedCertificate = await this.certificateService.updateCertificate(certificateId, certificateDetails);
            
            res.status(201).json(updatedCertificate);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    };

    deleteCertificate = async (req, res) => {
        try {
            const certificateId = req.params.id;
            await this.certificateService.deleteCertificate(certificateId);
            
            res.status(204).end();
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    };
}

export default CertificateController;