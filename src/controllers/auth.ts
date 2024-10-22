import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const authRouter = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(404).json({ error: "Usuário não encontrado" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Senha inválida" });
      return;
    }

    // Gerar token JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || "default-secret",
      { expiresIn: '1h' }
    );

    // Definir a URL de redirecionamento com base no papel do usuário
    const redirectUrl = user.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard';

    // Retornar o token e a URL de redirecionamento
    res.json({ token, redirectUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no servidor" });
  }
};
