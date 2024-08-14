-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_category_id_category_description_fkey";

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
