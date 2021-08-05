/*
  Warnings:

  - You are about to drop the column `description` on the `FinishedBook` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `ReadingBook` table. All the data in the column will be lost.
  - Added the required column `dateFinished` to the `FinishedBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FinishedBook" DROP COLUMN "description",
ADD COLUMN     "dateFinished" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ReadingBook" DROP COLUMN "description";
