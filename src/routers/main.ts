import { Router } from 'express';
import * as pingController from '../controllers/ping';
import * as authController from '../controllers/auth';
import * as registerController from '../controllers/user';
import * as cursosController from '../controllers/cursos';

export const mainRouter = Router();

// Rotas que não precisam de autenticação
mainRouter.post('/auth', authController.authRouter);
mainRouter.post('/register', registerController.registerUser);

mainRouter.get('/alunos', registerController.getAlunos);
mainRouter.get('/curso', cursosController.getCursos);
mainRouter.post('/cursos', cursosController.registerCurso);

mainRouter.get('/ping', pingController.ping);
mainRouter.get('/', (req, res) => {
  res.send('API funcionando!');
});
