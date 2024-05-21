CREATE TABLE IF NOT EXISTS `transactions` (
    `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `account_id` INT,
    `transCategory_id` int(11) NOT NULL,
    `trans_date` DATE NOT NULL,
    `type` ENUM('Einnahme', 'Ausgabe') NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `description` varchar(255),
    FOREIGN KEY (`account_id`) REFERENCES `accounts`(`account_id`),
    FOREIGN KEY (`transCategory_id`) REFERENCES `transCategories`(`id`)
);