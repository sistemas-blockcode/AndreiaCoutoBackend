-- CreateTable
CREATE TABLE "Curso" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "instrutor" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "thumbnail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CursoAlunos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CursoAlunos_AB_unique" ON "_CursoAlunos"("A", "B");

-- CreateIndex
CREATE INDEX "_CursoAlunos_B_index" ON "_CursoAlunos"("B");

-- AddForeignKey
ALTER TABLE "_CursoAlunos" ADD CONSTRAINT "_CursoAlunos_A_fkey" FOREIGN KEY ("A") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CursoAlunos" ADD CONSTRAINT "_CursoAlunos_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
