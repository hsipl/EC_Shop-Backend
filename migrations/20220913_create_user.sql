-- +migrate Up
CREATE TABLE `user` (
    `id` int AUTO_INCREMENT NOT NULL, 
    `email` varchar(256) NOT NULL,
    `password` varchar(64) NOT NULL,
    `name` varchar(256) NOT NULL, 
    `phone` varchar(64) NOT NULL,
    `last_login_ip` varchar(256) NOT NULL,
    `status` tinyint(1) NOT NULL,
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`)
);
-- +migrate Down
DROP TABLE `user`;