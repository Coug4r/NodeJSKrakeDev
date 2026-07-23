-- CreateTable
CREATE TABLE "Album" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "artista" TEXT NOT NULL,
    "anio" INTEGER NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cancion" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "duracion" INTEGER NOT NULL,
    "albumId" INTEGER NOT NULL,

    CONSTRAINT "Cancion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cancion" ADD CONSTRAINT "Cancion_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;
