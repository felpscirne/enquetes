import { Request, Response } from 'express';
import { z } from 'zod';
import { RegisterUserUseCase } from '@/application/use-cases/register-user.use-case';

const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export class RegisterUserController {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const validation = registerSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.issues });
    }

    const { name, email, password } = validation.data;

    try {
      const result = await this.registerUserUseCase.execute({
        name,
        email,
        password,
      });

      return res.status(201).json(result);
    } catch (error: any) {
      if (error.message === 'User already exists') {
        return res.status(409).json({ error: error.message });
      }
      
      console.error(error); 
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}