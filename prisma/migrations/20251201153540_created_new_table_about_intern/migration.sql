-- CreateTable
CREATE TABLE "Internships" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "organizationInfo" TEXT NOT NULL,
    "jobInfo" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "addnationalInfo" TEXT,
    "imgUrl" TEXT,

    CONSTRAINT "Internships_pkey" PRIMARY KEY ("id")
);
