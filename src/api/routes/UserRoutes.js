import express from 'express';
import UserController from '../controllers/UserController.js';
import UserService from '../../services/UserService.js';
import UserRepository from '../../repositories/UserRepository.js';
import authenticateToken from '../middleware/authenticateTokenMiddleware.js'; // Ajuste o caminho conforme necessário

const router = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post('/', userController.createUser);
router.post('/login', userController.login);

router.get('/', authenticateToken, userController.getUsers);
router.get('/:id', authenticateToken, userController.getUser);
router.patch('/:id', authenticateToken, userController.updateUser);
router.delete('/:id', authenticateToken, userController.deleteUser);


export default router;
