import express from 'express';
import CertificateController from '../controllers/CertificateController.js'; 
import CertificateService from '../../services/CertificateService.js'; 
import CertificateRepository from '../../repositories/CertificateRepository.js';
import authenticateToken from '../middleware/authenticateTokenMiddleware.js';

const router = express.Router();

const certificateRepository = new CertificateRepository();
const certificateService = new CertificateService(certificateRepository);
const certificateController = new CertificateController(certificateService);

router.get('/', authenticateToken, certificateController.getAllCertificates);
router.get('/user/', authenticateToken, certificateController.findCertificatesByUserId);
router.get('/:id', authenticateToken, certificateController.getCertificateById);
router.post('/', authenticateToken, certificateController.createCertificate);
router.patch('/:id', authenticateToken, certificateController.updateCertificate);
router.delete('/:id', authenticateToken, certificateController.deleteCertificate);

export default router;
