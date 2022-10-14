-- +migrate Up
CREATE TABLE `access` (
    `id` int(11) NOT NULL AUTO_INCREMENT, 
    `module_name` varchar(256) NULL DEFAULT NULL,
    `type` tinyint(1) NULL DEFAULT NULL,
    `action_name` varchar(256) NULL DEFAULT NULL,
    `url` varchar(256) NOT NULL, 
    `module_id` int(11) NOT NULL,
    `sort` int(11) NOT NULL,
    `description` varchar(256) NOT NULL, 
    `status` tinyint(1) NOT NULL,
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);
-- +migrate Down
DROP TABLE `access`;