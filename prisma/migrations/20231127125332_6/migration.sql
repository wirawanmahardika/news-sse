/*
  Warnings:

  - You are about to alter the column `created_at` on the `news` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `content` ADD COLUMN `created_at` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `news` MODIFY `created_at` TIMESTAMP NOT NULL;
