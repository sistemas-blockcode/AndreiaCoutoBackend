import { Request, Response } from 'express';
import { prisma } from '../utils/prisma'; // Certifique-se de que o Prisma Client esteja corretamente importado
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { 
    nome, 
    email, 
    cpf, 
    telefone, 
    cep, 
    endereco, 
    cursoIds = [], // Array de IDs de cursos, caso fornecido
    dataInscricao, 
    tipoUsuario 
  } = req.body;

  try {
    // Verificar se o e-mail já está cadastrado
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      res.status(400).json({ message: 'E-mail já cadastrado' });
      return;
    }

    // Verificar se o CPF já está cadastrado
    const cpfExists = await prisma.user.findUnique({
      where: { cpf },
    });

    if (cpfExists) {
      res.status(400).json({ message: 'CPF já cadastrado' });
      return;
    }

    // Verificar se os cursos existem, caso algum cursoId seja fornecido
    if (cursoIds.length > 0) {
      const cursosExistentes = await prisma.curso.findMany({
        where: {
          id: { in: cursoIds },
        },
      });

      // Garantir que todos os cursos fornecidos existem
      if (cursosExistentes.length !== cursoIds.length) {
        res.status(400).json({ message: 'Um ou mais cursos fornecidos não foram encontrados' });
        return;
      }
    }

    // Gerar token JWT
    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'default-secret', { expiresIn: '1h' });

    // Criar novo usuário no banco de dados com os IDs dos cursos
    const newUser = await prisma.user.create({
      data: {
        nome,
        email,
        cpf,
        telefone,
        cep,
        endereco: {
          create: {
            rua: endereco.rua,
            numero: endereco.numero,
            complemento: endereco.complemento || null,
            bairro: endereco.bairro,
            cidade: endereco.cidade,
            estado: endereco.estado,
          },
        },
        dataInscricao: new Date(dataInscricao),
        role: tipoUsuario, // Define o papel do usuário
        cursoIds, // Armazena os IDs dos cursos diretamente
        password: '', // A senha será definida posteriormente
      },
    });

    // Configuração do Nodemailer para envio de e-mails
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465, // Porta para Hostinger com SSL
      secure: true, // SSL ativo
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const link = `http://localhost:3000/definir-senha/${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Defina sua senha',
      html: `<p>Olá, ${nome}. Por favor, clique no link abaixo para definir sua senha:</p><a href="${link}">Definir senha</a>`,
    };

    // Enviar o e-mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Erro ao enviar e-mail:', error);
        res.status(500).json({ message: 'Erro ao enviar e-mail' });
        return;
      }

      console.log('E-mail enviado:', info.response);
      // Retornar resposta de sucesso
      res.status(201).json({ message: 'Usuário cadastrado com sucesso. Verifique o e-mail para definir sua senha.' });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};



export const getAlunos = async (req: Request, res: Response): Promise<void> => {
  try {
    // Buscar todos os alunos com os IDs de cursos associados
    const alunos = await prisma.user.findMany({
      where: {
        role: 'USER',
      },
      include: {
        endereco: true, // Se precisar incluir os endereços
      },
    });

    // Buscar os cursos dos alunos
    const cursos = await prisma.curso.findMany({
      where: {
        id: {
          in: alunos.flatMap(aluno => aluno.cursoIds), // Pega todos os IDs de cursos
        },
      },
    });

    // Transformar os alunos com os nomes dos cursos
    const alunosComCursos = alunos.map(aluno => ({
      ...aluno,
      cursos: cursos.filter(curso => aluno.cursoIds.includes(curso.id)).map(curso => curso.nome),
    }));

    res.status(200).json(alunosComCursos);
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};