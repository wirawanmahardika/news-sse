-- CreateTable
CREATE TABLE `User` (
    `id_user` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(51) NOT NULL,
    `email` VARCHAR(101) NOT NULL,
    `fullname` VARCHAR(101) NOT NULL,
    `password` VARCHAR(101) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category_news` (
    `id_category_news` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(101) NOT NULL,
    `img` MEDIUMBLOB NOT NULL,
    `created_at` TIMESTAMP NOT NULL,

    PRIMARY KEY (`id_category_news`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `News` (
    `id_news` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_category_news` INTEGER UNSIGNED NOT NULL,
    `img` MEDIUMBLOB NOT NULL,
    `title` VARCHAR(201) NOT NULL,
    `created_at` TIMESTAMP NOT NULL,

    PRIMARY KEY (`id_news`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Content` (
    `id_content` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_news` INTEGER UNSIGNED NOT NULL,
    `sub_title` VARCHAR(201) NOT NULL,
    `content` TEXT NOT NULL,

    PRIMARY KEY (`id_content`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `News` ADD CONSTRAINT `News_id_category_news_fkey` FOREIGN KEY (`id_category_news`) REFERENCES `Category_news`(`id_category_news`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Content` ADD CONSTRAINT `Content_id_news_fkey` FOREIGN KEY (`id_news`) REFERENCES `News`(`id_news`) ON DELETE RESTRICT ON UPDATE CASCADE;
