/*
  Warnings:

  - Made the column `paymentUrl` on table `Donation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Donation" ALTER COLUMN "paymentUrl" SET NOT NULL;
