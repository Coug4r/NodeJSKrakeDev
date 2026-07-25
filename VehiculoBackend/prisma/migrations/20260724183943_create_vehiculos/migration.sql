-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "rol" VARCHAR(20),
    "username" VARCHAR(50) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehiculos" (
    "id" SERIAL NOT NULL,
    "foto" BYTEA,
    "marca" VARCHAR(255) NOT NULL,
    "mime_type" VARCHAR(255),
    "modelo" VARCHAR(255) NOT NULL,

    CONSTRAINT "vehiculos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ukm2dvbwfge291euvmk6vkkocao" ON "usuarios"("username");
