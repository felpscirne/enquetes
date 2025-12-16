-- AlterTable
ALTER TABLE "polls" ADD COLUMN     "categories" TEXT[] DEFAULT ARRAY[]::TEXT[];
