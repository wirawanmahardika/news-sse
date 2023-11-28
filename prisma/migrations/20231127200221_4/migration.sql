/*
  Warnings:

  - You are about to alter the column `created_at` on the `category_news` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `created_at` on the `news` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `category_news` MODIFY `created_at` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `news` MODIFY `created_at` TIMESTAMP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);
