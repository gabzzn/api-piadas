import { Router } from 'express';
import { registrarUsuario, login } from '../controllers/authController.js';

const router = Router();
router.post('/usuarios', registrarUsuario);

router.post('/login', login);

export default router;





