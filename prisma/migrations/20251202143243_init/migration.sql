-- CreateTable
CREATE TABLE "SavedInternships" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "internId" TEXT NOT NULL,

    CONSTRAINT "SavedInternships_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SavedInternships" ADD CONSTRAINT "SavedInternships_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedInternships" ADD CONSTRAINT "SavedInternships_internId_fkey" FOREIGN KEY ("internId") REFERENCES "Internships"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
