CREATE TABLE IF NOT EXISTS `clubCash` (
    `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `createt_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `balance` DECIMAL(10, 2) NOT NULL
);