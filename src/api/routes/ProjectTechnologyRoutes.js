import express from 'express';
import ProjectTechnologyController from '../controllers/ProjectTechnologyController.js'; 
import ProjectTechnologyRepository from '../../repositories/ProjectTechnologyRepository.js';
import authenticateToken from '../middleware/authenticateTokenMiddleware.js';
import ProjectTechnologyService from '../../services/projectTechnologyService.js';

const router = express.Router();

const projectTechnologyRepository = new ProjectTechnologyRepository();
const projectTechnologyService = new ProjectTechnologyService(projectTechnologyRepository);
const projectTechnologyController = new ProjectTechnologyController(projectTechnologyService);

router.get('/project/:id', authenticateToken, projectTechnologyController.getProjectTechnologyByProjectId);
router.get('/', authenticateToken, projectTechnologyController.getAllProjectTechnology);
router.get('/:id', authenticateToken, projectTechnologyController.getProjectProjectTechnologyId);
router.post('/', authenticateToken, projectTechnologyController.createProjectTechnology);
router.patch('/:id', authenticateToken, projectTechnologyController.updateProjectTechnology);
router.delete('/:id', authenticateToken, projectTechnologyController.deleteProjectTechnology);

export default router;