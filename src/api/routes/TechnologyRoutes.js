import express from 'express';
import TechnologyController from '../controllers/TechnologyController.js'; 
import TechnologyService from '../../services/TechnologyService.js'; 
import TechnologyRepository from '../../repositories/TechnologyRepository.js';
import authenticateToken from '../middleware/authenticateTokenMiddleware.js';
import storage from '../../config/multer.js';
import multer from 'multer';
import FirebaseStorageService from '../../services/FirebaseStorageService.js'
const upload = multer({ storage })
const router = express.Router();

const firebaseStorageService = new FirebaseStorageService();
const technologyRepository = new TechnologyRepository();
const technologyService = new TechnologyService(technologyRepository);
const technologyController = new TechnologyController(technologyService, firebaseStorageService);

router.get('/user', authenticateToken, technologyController.getTechnologiesByUser);
router.get('/', authenticateToken, technologyController.getTechnologies);
router.get('/:id', authenticateToken, technologyController.getTechnology);
router.post('/', upload.single('file'), authenticateToken, technologyController.createTechnology);
router.get('/user', authenticateToken, technologyController.getTechnologiesByUser);
router.patch('/:id', upload.single('file'), authenticateToken, technologyController.updateTechnology);
router.delete('/:id', authenticateToken, technologyController.deleteTechnology);

export default router;
