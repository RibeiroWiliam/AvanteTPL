/*
  Warnings:

  - The primary key for the `Publisher` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[name]` on the table `Publisher` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_publisherId_fkey";

-- DropForeignKey
ALTER TABLE "Availability" DROP CONSTRAINT "Availability_publisherId_fkey";

-- AlterTable
ALTER TABLE "Assignment" ALTER COLUMN "publisherId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Availability" ALTER COLUMN "publisherId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Publisher" DROP CONSTRAINT "Publisher_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "isAdmin" SET DEFAULT false,
ADD CONSTRAINT "Publisher_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Publisher_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Publisher_name_key" ON "Publisher"("name");

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
