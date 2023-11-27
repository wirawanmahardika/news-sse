/*
  Warnings:

  - You are about to alter the column `created_at` on the `category_news` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `created_at` on the `news` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- DropForeignKey
ALTER TABLE `content` DROP FOREIGN KEY `Content_id_content_fkey`;

-- AlterTable
ALTER TABLE `category_news` MODIFY `created_at` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `news` MODIFY `created_at` TIMESTAMP NOT NULL;

-- AddForeignKey
ALTER TABLE `Content` ADD CONSTRAINT `Content_id_news_fkey` FOREIGN KEY (`id_news`) REFERENCES `News`(`id_news`) ON DELETE RESTRICT ON UPDATE CASCADE;
