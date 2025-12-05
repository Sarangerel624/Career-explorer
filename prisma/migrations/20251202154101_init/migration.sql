/*
  Warnings:

  - The primary key for the `SavedInternships` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SavedInternships` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SavedInternships" DROP CONSTRAINT "SavedInternships_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "SavedInternships_pkey" PRIMARY KEY ("userId", "internId");
