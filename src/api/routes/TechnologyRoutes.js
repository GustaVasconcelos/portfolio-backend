import express from 'express';
import TechnologyController from '../controllers/TechnologyController.js'; 
import TechnologyService from '../../services/TechnologyService.js'; 
import TechnologyRepository from '../../repositories/TechnologyRepository.js';
import authenticateToken from '../middleware/authenticateTokenMiddleware.js';
import storage from '../../config/multer.js';
import multer from 'multer';

const upload = multer({ storage })
const router = express.Router();

const technologyRepository = new TechnologyRepository();
const technologyService = new TechnologyService(technologyRepository);
const technologyController = new TechnologyController(technologyService);

router.get('/user', authenticateToken, technologyController.getTechnologiesByUser);
router.get('/', authenticateToken, technologyController.getTechnologies);
router.get('/:id', authenticateToken, technologyController.getTechnology);
router.post('/', upload.single('file') ,authenticateToken, technologyController.createTechnology);
router.get('/user', authenticateToken, technologyController.getTechnologiesByUser);
router.patch('/:id', authenticateToken, technologyController.updateTechnology);
router.delete('/:id', authenticateToken, technologyController.deleteTechnology);

export default router;
