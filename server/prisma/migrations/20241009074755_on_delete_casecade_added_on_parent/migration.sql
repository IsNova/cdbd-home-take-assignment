-- DropForeignKey
ALTER TABLE "menu" DROP CONSTRAINT "menu_parentId_fkey";

-- AddForeignKey
ALTER TABLE "menu" ADD CONSTRAINT "menu_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;
