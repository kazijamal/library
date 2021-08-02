/*
  Warnings:

  - You are about to drop the column `noteHeading` on the `Highlight` table. All the data in the column will be lost.
  - You are about to drop the column `noteText` on the `Highlight` table. All the data in the column will be lost.
  - You are about to drop the column `sectionHeading` on the `Highlight` table. All the data in the column will be lost.
  - Added the required column `color` to the `Highlight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Highlight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Highlight" DROP COLUMN "noteHeading",
DROP COLUMN "noteText",
DROP COLUMN "sectionHeading",
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "content" TEXT NOT NULL;
