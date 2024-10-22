/*
  Warnings:

  - You are about to drop the `UserOnCourse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserOnCourse" DROP CONSTRAINT "UserOnCourse_cursoId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnCourse" DROP CONSTRAINT "UserOnCourse_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cursoIds" INTEGER[];

-- DropTable
DROP TABLE "UserOnCourse";
