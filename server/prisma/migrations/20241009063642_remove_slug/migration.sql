/*
  Warnings:

  - You are about to drop the column `slug` on the `menu` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "menu_slug_key";

-- AlterTable
ALTER TABLE "menu" DROP COLUMN "slug";
