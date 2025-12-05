/*
  Warnings:

  - Added the required column `internshipOpportunities` to the `AiResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AiResult" ADD COLUMN     "internshipOpportunities" JSONB NOT NULL,
ADD COLUMN     "recommendedSkills" TEXT[],
ADD COLUMN     "relatedCareers" TEXT[];
