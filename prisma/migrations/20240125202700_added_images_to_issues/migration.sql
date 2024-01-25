-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[];
