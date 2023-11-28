/*
  Warnings:

  - You are about to alter the column `created_at` on the `category_news` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `created_at` on the `news` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `category_news` MODIFY `created_at` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `news` MODIFY `created_at` TIMESTAMP NOT NULL;

-- CreateTable
CREATE TABLE `User` (
    `id_user` INTEGER UNSIGNED NOT NULL,
    `username` VARCHAR(51) NOT NULL,
    `email` VARCHAR(101) NOT NULL,
    `fullname` VARCHAR(101) NOT NULL,
    `password` VARCHAR(101) NOT NULL,
    `role` ENUM('developer', 'admin') NOT NULL,

    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
