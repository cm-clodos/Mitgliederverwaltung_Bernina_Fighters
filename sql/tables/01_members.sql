CREATE TABLE IF NOT EXISTS `members` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `firstname` varchar(255) NOT NULL DEFAULT '',
    `lastname` varchar(255) NOT NULL DEFAULT '',
    `email` varchar(255) NOT NULL DEFAULT '',
    `telephone` varchar(255) NOT NULL DEFAULT '',
    `active` boolean NOT NULL,
    `role_id` int(11) NOT NULL,
    `entry_date` DATE NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY (`id`),
    UNIQUE KEY `email` (`email`),
    FOREIGN KEY (`role_id`) REFERENCES `memberrole`(`id`)
    );