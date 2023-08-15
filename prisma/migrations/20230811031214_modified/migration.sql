/*
  Warnings:

  - You are about to drop the column `itemId` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `menuItemId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_itemId_fkey";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "itemId",
ADD COLUMN     "menuItemId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
