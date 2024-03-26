import express from 'express';
import ProjectController from '../controllers/ProjectController.js'; 
import ProjectService from '../../services/ProjectService.js'; 
import ProjectRepository from '../../repositories/ProjectRepository.js';
import authenticateToken from '../middleware/authenticateTokenMiddleware.js';

const router = express.Router();

const projectRepository = new ProjectRepository();
const projectService = new ProjectService(projectRepository);
const projectController = new ProjectController(projectService);

router.get('/user', authenticateToken, projectController.getProjectsByUser);
router.get('/', authenticateToken, projectController.getProjects);
router.get('/:id', authenticateToken, projectController.getProject);
router.post('/', authenticateToken, projectController.createProject);
router.patch('/:id', authenticateToken, projectController.updateProject);
router.delete('/:id', authenticateToken, projectController.deleteProject);

export default router;
