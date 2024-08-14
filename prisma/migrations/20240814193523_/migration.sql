-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_category_id_fkey";

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_category_id_category_description_fkey" FOREIGN KEY ("category_id", "category_description") REFERENCES "categories"("id", "description") ON DELETE RESTRICT ON UPDATE CASCADE;
