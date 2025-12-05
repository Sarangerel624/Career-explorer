/*
  Warnings:

  - The `topCareers` column on the `AiResult` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "AiResult" DROP CONSTRAINT "AiResult_aiSystemId_fkey";

-- AlterTable
ALTER TABLE "AiResult" ALTER COLUMN "aiSystemId" DROP NOT NULL,
DROP COLUMN "topCareers",
ADD COLUMN     "topCareers" TEXT[];

-- AddForeignKey
ALTER TABLE "AiResult" ADD CONSTRAINT "AiResult_aiSystemId_fkey" FOREIGN KEY ("aiSystemId") REFERENCES "AiSystem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
