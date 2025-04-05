-- CreateTable
CREATE TABLE `users` (
    `id_user` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(51) NOT NULL,
    `email` VARCHAR(101) NOT NULL,
    `fullname` VARCHAR(101) NOT NULL,
    `password` VARCHAR(101) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category_news` (
    `id_category_news` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(101) NOT NULL,
    `img` MEDIUMBLOB NULL,
    `created_at` TIMESTAMP NOT NULL,

    PRIMARY KEY (`id_category_news`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `news` (
    `id_news` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_category_news` INTEGER UNSIGNED NOT NULL,
    `img` MEDIUMBLOB NULL,
    `title` VARCHAR(201) NOT NULL,
    `content` TEXT NOT NULL,
    `created_at` TIMESTAMP NOT NULL,

    PRIMARY KEY (`id_news`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `news` ADD CONSTRAINT `news_id_category_news_fkey` FOREIGN KEY (`id_category_news`) REFERENCES `category_news`(`id_category_news`) ON DELETE RESTRICT ON UPDATE CASCADE;
