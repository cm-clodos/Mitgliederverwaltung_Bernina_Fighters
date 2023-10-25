CREATE TABLE IF NOT EXISTS `transCategories` (
    `id` int(11) PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    `type` ENUM('Einnahme', 'Ausgabe') NOT NULL
);