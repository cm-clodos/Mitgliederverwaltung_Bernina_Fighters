CREATE TABLE IF NOT EXISTS `memberrole` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `role` varchar(255) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `role` (`role`)
    );