/*
  Warnings:

  - The `jobInfo` column on the `Internships` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `requirements` column on the `Internships` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `addnationalInfo` column on the `Internships` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `deadline` to the `Internships` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Internships" ADD COLUMN     "deadline" TEXT NOT NULL,
ADD COLUMN     "salary" TEXT,
DROP COLUMN "jobInfo",
ADD COLUMN     "jobInfo" TEXT[],
DROP COLUMN "requirements",
ADD COLUMN     "requirements" TEXT[],
DROP COLUMN "addnationalInfo",
ADD COLUMN     "addnationalInfo" TEXT[];
