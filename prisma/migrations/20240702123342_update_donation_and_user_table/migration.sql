/*
  Warnings:

  - You are about to drop the column `donorEmail` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `donorName` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `donorPhone` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `Donation` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "donorEmail",
DROP COLUMN "donorName",
DROP COLUMN "donorPhone",
DROP COLUMN "note",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
