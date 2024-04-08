/*
  Warnings:

  - You are about to drop the column `publisherId` on the `Assignment` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Pioneer" AS ENUM ('Regular', 'Auxiliar');

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_publisherId_fkey";

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "publisherId";

-- AlterTable
ALTER TABLE "Publisher" ADD COLUMN     "pioneer" "Pioneer";

-- CreateTable
CREATE TABLE "_AssignmentToPublisher" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AssignmentToPublisher_AB_unique" ON "_AssignmentToPublisher"("A", "B");

-- CreateIndex
CREATE INDEX "_AssignmentToPublisher_B_index" ON "_AssignmentToPublisher"("B");

-- AddForeignKey
ALTER TABLE "_AssignmentToPublisher" ADD CONSTRAINT "_AssignmentToPublisher_A_fkey" FOREIGN KEY ("A") REFERENCES "Assignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssignmentToPublisher" ADD CONSTRAINT "_AssignmentToPublisher_B_fkey" FOREIGN KEY ("B") REFERENCES "Publisher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
