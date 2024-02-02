/*
  Warnings:

  - Added the required column `creatorId` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `managerId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "creatorId" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "managerId" VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
