/*
  Warnings:

  - Added the required column `size` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Made the column `fieldOfStudy` on table `Note` required. This step will fail if there are existing NULL values in that column.
  - Made the column `institution` on table `Note` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subject` on table `Note` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "size" INTEGER NOT NULL,
ALTER COLUMN "fieldOfStudy" SET NOT NULL,
ALTER COLUMN "institution" SET NOT NULL,
ALTER COLUMN "subject" SET NOT NULL;
