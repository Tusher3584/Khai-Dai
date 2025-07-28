/*
  Warnings:

  - The primary key for the `Cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `cartId` on the `Item` table. All the data in the column will be lost.
  - Added the required column `cartUserId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_cartId_fkey";

-- DropIndex
DROP INDEX "Cart_userId_key";

-- AlterTable
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Cart_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "cartId",
ADD COLUMN     "cartUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_cartUserId_fkey" FOREIGN KEY ("cartUserId") REFERENCES "Cart"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
