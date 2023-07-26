CREATE TABLE IF NOT EXISTS `payment` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `paid` boolean NOT NULL DEFAULT 0,
    `paid_date` timestamp NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `member_id` int(11) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`member_id`) REFERENCES `members`(`id`) ON DELETE CASCADE
    );