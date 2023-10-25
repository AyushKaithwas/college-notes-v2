/*
  Warnings:

  - You are about to drop the column `hashtags` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `subCode` on the `Note` table. All the data in the column will be lost.
  - Added the required column `noteSize` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "hashtags",
DROP COLUMN "subCode",
ADD COLUMN     "fieldOfStudy" TEXT,
ADD COLUMN     "institution" TEXT,
ADD COLUMN     "noteSize" INTEGER NOT NULL,
ADD COLUMN     "semester" TEXT,
ADD COLUMN     "subject" TEXT;
