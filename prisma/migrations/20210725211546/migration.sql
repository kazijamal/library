-- AlterTable
ALTER TABLE "FinishedBook" ALTER COLUMN "title" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "ReadingBook" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Highlight" (
    "id" SERIAL NOT NULL,
    "finishedBookId" INTEGER NOT NULL,
    "sectionHeading" TEXT NOT NULL,
    "noteHeading" TEXT NOT NULL,
    "location" INTEGER NOT NULL,
    "noteText" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Highlight" ADD FOREIGN KEY ("finishedBookId") REFERENCES "FinishedBook"("id") ON DELETE CASCADE ON UPDATE CASCADE;
