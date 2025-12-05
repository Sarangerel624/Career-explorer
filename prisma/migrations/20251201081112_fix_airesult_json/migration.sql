/*
  Warnings:

  - Changed the type of `topCareers` on the `AiResult` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `recommendedSkills` on the `AiResult` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `relatedCareers` on the `AiResult` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "AiResult" DROP COLUMN "topCareers",
ADD COLUMN     "topCareers" JSONB NOT NULL,
DROP COLUMN "recommendedSkills",
ADD COLUMN     "recommendedSkills" JSONB NOT NULL,
DROP COLUMN "relatedCareers",
ADD COLUMN     "relatedCareers" JSONB NOT NULL;
