import express from 'express';
import ProjectImageController from '../controllers/ProjectImageController.js';
import ProjectImageRepository from '../../repositories/ProjectImageRepository.js'
import ProjectImageService from '../../services/ProjectImageService.js'
import authenticateToken from '../middleware/authenticateTokenMiddleware.js';
import storage from '../../config/multer.js';
import multer from 'multer';
import FirebaseStorageService from '../../services/FirebaseStorageService.js'

const upload = multer({ storage })
const router = express.Router();

const firebaseStorageService = new FirebaseStorageService();
const projectImageRepository = new ProjectImageRepository();
const projectImageService = new ProjectImageService(projectImageRepository);
const projectImageController = new ProjectImageController(projectImageService, firebaseStorageService);

router.get('/project/:id', authenticateToken, projectImageController.getProjectImagesByProjectId);
router.get('/', authenticateToken, projectImageController.getAllProjectImages);
router.get('/:id', authenticateToken, projectImageController.getProjectImageById);
router.post('/', upload.single('file'), authenticateToken, projectImageController.createProjectImage);
router.patch('/:id', upload.single('file'), authenticateToken, projectImageController.updateProjectImage);
router.delete('/:id', authenticateToken, projectImageController.deleteProjectImage);

export default router;
