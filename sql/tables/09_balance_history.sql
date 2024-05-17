CREATE TABLE IF NOT EXISTS `balance_history` (
    `history_id` INT PRIMARY KEY AUTO_INCREMENT,
    `account_id` INT,
    `change_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `change_amount` DECIMAL(10, 2) NOT NULL,
    `balance_after_change` DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (`account_id`) REFERENCES `accounts`(`account_id`)
);