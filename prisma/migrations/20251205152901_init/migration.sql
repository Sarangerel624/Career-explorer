-- CreateTable
CREATE TABLE "RadarChartResult" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RadarChartResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RadarChartResult" ADD CONSTRAINT "RadarChartResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
