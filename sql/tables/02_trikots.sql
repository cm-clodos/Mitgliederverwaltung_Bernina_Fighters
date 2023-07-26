CREATE TABLE IF NOT EXISTS `trikots` (
    `number` int(11) NOT NULL,
    `name` varchar(255) NOT NULL DEFAULT '',
    `available` boolean NOT NULL,
    `member_id` int(11) NULL,
    PRIMARY KEY (`number`),
    FOREIGN KEY (`member_id`) REFERENCES `members`(`id`) ON DELETE SET NULL,
    UNIQUE KEY `member_id` (`member_id`)
    );