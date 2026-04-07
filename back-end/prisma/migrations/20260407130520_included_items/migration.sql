/*
  Warnings:

  - You are about to drop the `MessageLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MessageLog" DROP CONSTRAINT "MessageLog_appointmentId_fkey";

-- DropTable
DROP TABLE "MessageLog";

-- CreateTable
CREATE TABLE "ProductIncludedItem" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductIncludedItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductIncludedItem" ADD CONSTRAINT "ProductIncludedItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
