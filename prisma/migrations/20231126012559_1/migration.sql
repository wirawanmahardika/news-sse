-- CreateTable
CREATE TABLE `News` (
    `id_news` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(101) NOT NULL,
    `img` MEDIUMBLOB NULL,
    `created_at` TIMESTAMP NOT NULL,

    PRIMARY KEY (`id_news`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Content` (
    `id_content` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_news` INTEGER UNSIGNED NOT NULL,
    `img` MEDIUMBLOB NULL,
    `title` VARCHAR(201) NOT NULL,
    `sub_title` VARCHAR(201) NOT NULL,
    `content` TEXT NOT NULL,

    PRIMARY KEY (`id_content`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Content` ADD CONSTRAINT `Content_id_news_fkey` FOREIGN KEY (`id_news`) REFERENCES `News`(`id_news`) ON DELETE RESTRICT ON UPDATE CASCADE;
