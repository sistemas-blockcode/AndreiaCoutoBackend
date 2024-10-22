import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteUsers() {
  try {
    // Deletar os usuários com os e-mails especificados
    const deleteResult = await prisma.user.deleteMany({
      where: {
        email: {
          in: ['pietrosantos@blockcode.online', 'sistemas@blockcode.online', 'pietro07menezes@gmail.com', 'teste@gmail.com', 'teste22223332@gmail.com', 'reconectarseufeminino@gmail.com' ],
        },
      },
    });

    console.log(`Usuários deletados: ${deleteResult.count}`);
  } catch (error) {
    console.error("Erro ao deletar usuários:", error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteUsers();
