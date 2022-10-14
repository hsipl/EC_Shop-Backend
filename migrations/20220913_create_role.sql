-- +migrate Up
CREATE TABLE `role` (
    `id` int NOT NULL  AUTO_INCREMENT, 
    `title` varchar(256) NOT NULL,
    `description` varchar(256) NULL DEFAULT NULL,
    `status` tinyint(1) NOT NULL,
    `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

-- +migrate Down
DROP TABLE `role`;