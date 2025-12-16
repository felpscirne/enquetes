import { Request, Response } from 'express';
import { z } from 'zod';
import { AuthenticateUserUseCase } from '@/application/use-cases/authenticate-user.use-case';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const validation = loginSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.issues });
    }

    const { email, password } = validation.data;

    try {
      const result = await this.authenticateUserUseCase.execute({
        email,
        password,
      });

      return res.status(200).json(result);
    } catch (error: any) {
      if (error.message === 'Invalid credentials') {
        return res.status(401).json({ error: error.message });
      }
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}