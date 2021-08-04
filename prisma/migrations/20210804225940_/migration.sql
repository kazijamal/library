/*
  Warnings:

  - Added the required column `description` to the `FinishedBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageLink` to the `FinishedBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageCount` to the `FinishedBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtitle` to the `FinishedBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `volumeId` to the `FinishedBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `ReadingBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageLink` to the `ReadingBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageCount` to the `ReadingBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtitle` to the `ReadingBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `volumeId` to the `ReadingBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FinishedBook" ADD COLUMN     "authors" TEXT[],
ADD COLUMN     "categories" TEXT[],
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "imageLink" TEXT NOT NULL,
ADD COLUMN     "pageCount" INTEGER NOT NULL,
ADD COLUMN     "subtitle" TEXT NOT NULL,
ADD COLUMN     "volumeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ReadingBook" ADD COLUMN     "authors" TEXT[],
ADD COLUMN     "categories" TEXT[],
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "imageLink" TEXT NOT NULL,
ADD COLUMN     "pageCount" INTEGER NOT NULL,
ADD COLUMN     "subtitle" TEXT NOT NULL,
ADD COLUMN     "volumeId" TEXT NOT NULL;
