import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Deletar todos os usuários antes de recriar os seeds
  await prisma.user.deleteMany({}); // Limpa todos os registros na tabela 'user'

  const hashedPassword = await bcrypt.hash('root', 10);

  // Usuário comum
  const userCommon = await prisma.user.upsert({
    where: { email: 'pietrosantos@blockcode.online' },
    update: {},
    create: {
      nome: 'Pietro Santos',
      email: 'pietrosantos@blockcode.online',
      password: hashedPassword, // Senha criptografada
      role: 'USER', // Papel definido como USER
      cep: '12345-678',
      cpf: '123.456.789-00',
      dataInscricao: new Date(),
      telefone: '11987654321',
    },
  });

  // Admin
  const userAdmin = await prisma.user.upsert({
    where: { email: 'sistemas@blockcode.online' },
    update: {},
    create: {
      nome: 'Admin User',
      email: 'sistemas@blockcode.online',
      password: hashedPassword, // Senha criptografada
      role: 'ADMIN',
      cep: '98765-432',
      cpf: '987.654.321-00',
      dataInscricao: new Date(),
      telefone: '21987654321',
    },
  });

  console.log({ userCommon, userAdmin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
