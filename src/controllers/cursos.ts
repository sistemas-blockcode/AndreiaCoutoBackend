import { prisma } from '../utils/prisma';
import { Request, Response } from 'express';
import multer from 'multer'; // Para lidar com o upload de arquivos

// Configuração do multer para salvar as imagens na pasta 'uploads'
const upload = multer({ dest: 'uploads/' });

// Registrar um novo curso
export const registerCurso = [
  upload.single('thumbnail'), // Middleware para lidar com o upload de uma única imagem
  async (req: Request, res: Response): Promise<void> => {
    const { nome, instrutor } = req.body;
    const thumbnail = req.file; // Arquivo de imagem enviado

    try {
      if (!nome || !instrutor || !thumbnail) {
        res.status(400).json({ message: 'Campos obrigatórios estão faltando' });
        return;
      }

      // Criar um novo curso no banco de dados
      const novoCurso = await prisma.curso.create({
        data: {
          nome,
          instrutor,
          thumbnail: thumbnail.path, // Salvando o caminho da imagem no banco de dados
        },
      });

      res.status(201).json({ message: 'Curso cadastrado com sucesso', curso: novoCurso });
    } catch (error) {
      console.error('Erro ao registrar o curso:', error);
      res.status(500).json({ message: 'Erro no servidor ao registrar o curso' });
    }
  },
];

// Buscar cursos
export const getCursos = async (req: Request, res: Response): Promise<void> => {
  try {
    const cursos = await prisma.curso.findMany({
      select: {
        id: true,
        nome: true,
      },
    });

    res.status(200).json(cursos); // Retorna apenas o id e nome dos cursos
  } catch (error) {
    console.error('Erro ao buscar cursos:', error);
    res.status(500).json({ message: 'Erro no servidor ao buscar cursos' });
  }
};



