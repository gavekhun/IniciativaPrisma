-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipoUser" BOOLEAN NOT NULL,
    "email" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "CPF" BIGINT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "rating" DECIMAL(65,30) NOT NULL,
    "title" TEXT NOT NULL,
    "describe" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "methodPagament" TEXT NOT NULL,
    "estimate" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "methodPagament" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostersOnCart" (
    "postId" INTEGER NOT NULL,
    "cartId" INTEGER NOT NULL,

    CONSTRAINT "PostersOnCart_pkey" PRIMARY KEY ("postId","cartId")
);

-- CreateTable
CREATE TABLE "Fav" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Fav_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListFav" (
    "userId" INTEGER NOT NULL,
    "favsId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "ListFav_pkey" PRIMARY KEY ("userId","favsId","postId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_key" ON "Cart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ListFav_userId_key" ON "ListFav"("userId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostersOnCart" ADD CONSTRAINT "PostersOnCart_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostersOnCart" ADD CONSTRAINT "PostersOnCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListFav" ADD CONSTRAINT "ListFav_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListFav" ADD CONSTRAINT "ListFav_favsId_fkey" FOREIGN KEY ("favsId") REFERENCES "Fav"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListFav" ADD CONSTRAINT "ListFav_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
