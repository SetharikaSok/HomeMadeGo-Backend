/*
  Warnings:

  - You are about to drop the column `address` on the `Kitchen` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Kitchen" DROP COLUMN "address",
ADD COLUMN     "address1" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "address2" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "city" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "country" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "latitude" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "longitude" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "state" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "zipcode" TEXT NOT NULL DEFAULT '';
