/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cep` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `curso` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataInscricao` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "curso" TEXT NOT NULL,
ADD COLUMN     "dataInscricao" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "telefone" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Endereco" (
    "id" SERIAL NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Endereco_userId_key" ON "Endereco"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
