import { Router } from 'express';
import { makeRegisterUserController } from '@/main/factories/make-register-user';
import { makeAuthenticateUserController } from '@/main/factories/make-authenticate-user';
import { ensureAuthenticated } from '@/interface/middlewares/ensure-authenticated';

const authRoutes = Router();

authRoutes.post('/register', (req, res) => {
  const controller = makeRegisterUserController();
  return controller.handle(req, res);
});

authRoutes.post('/login', (req, res) => {
  const controller = makeAuthenticateUserController();
  return controller.handle(req, res);
});


// teste
authRoutes.get('/me', ensureAuthenticated, (req, res) => {
  return res.json({ 
    message: 'Autenticou', 
    userId: req.userId 
  });
});
export { authRoutes };