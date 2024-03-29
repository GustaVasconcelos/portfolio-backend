import { Validations, ValidationError } from '../utils/Validations.js'; 

class CertificateService {
    constructor(CertificateRepository) {
        this.certificateRepository = CertificateRepository;
        this.validations = Validations;
    }

    async getAllCertificates() {
        try {
            return this.certificateRepository.findAll();
        }catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(error.message);
            }
            throw error;
        }
    }

    async getCertificateById(id) {
        try {
            return this.certificateRepository.findById(id);
        }catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(error.message);
            }
            throw error;
        }
    }

    async createCertificate(certificateDetails) {
        try {
            this.validations.validateFields([
                certificateDetails.name, 
                certificateDetails.company, 
                certificateDetails.link, 
                certificateDetails.dateObtained.toString()
            ]);

            const createCertificateData = await this.certificateRepository.create(certificateDetails);

            return createCertificateData.toObject();
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(error.message);
            }
            throw error;
        }
    }

    async findCertificatesByUserId(userId) {
        try {
            return this.certificateRepository.findCertificatesByUserId(userId);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(error.message);
            }
            throw error;
        }
    }

    async updateCertificate (certificateId, certificateDetails) {
        try {
            this.validations.validateFields([certificateId]);
    
            const existingCertificate = await this.certificateRepository.findById(certificateId);
    
            if (!existingCertificate) {
                throw new Error('Certificado não encontrado');
            }
    
            const updatedCertificate = await this.certificateRepository.update(certificateId, certificateDetails);
    
            return updatedCertificate.toObject();
        }catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(error.message);
            }
            throw error;
        }
    }

    async deleteCertificate(certificateId) {
        try {
            return await this.certificateRepository.delete(certificateId);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(error.message);
            }
            throw error;
        }
    }
}

export default CertificateService;