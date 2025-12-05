/*
  Warnings:

  - You are about to drop the column `resultText` on the `AiResult` table. All the data in the column will be lost.
  - Added the required column `description` to the `AiResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalityType` to the `AiResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `AiResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topCareers` to the `AiResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AiResult" DROP COLUMN "resultText",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "personalityType" TEXT NOT NULL,
ADD COLUMN     "summary" TEXT NOT NULL,
ADD COLUMN     "topCareers" TEXT NOT NULL;
