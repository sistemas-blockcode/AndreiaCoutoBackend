/*
  Warnings:

  - You are about to drop the column `curso` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_CursoAlunos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CursoAlunos" DROP CONSTRAINT "_CursoAlunos_A_fkey";

-- DropForeignKey
ALTER TABLE "_CursoAlunos" DROP CONSTRAINT "_CursoAlunos_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "curso";

-- DropTable
DROP TABLE "_CursoAlunos";

-- CreateTable
CREATE TABLE "UserOnCourse" (
    "userId" INTEGER NOT NULL,
    "cursoId" INTEGER NOT NULL,

    CONSTRAINT "UserOnCourse_pkey" PRIMARY KEY ("userId","cursoId")
);

-- AddForeignKey
ALTER TABLE "UserOnCourse" ADD CONSTRAINT "UserOnCourse_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnCourse" ADD CONSTRAINT "UserOnCourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
