-- +migrate Up
CREATE TABLE `role_access` (
    `role_id` int NOT NULL, 
    `access_id` int NOT NULL,
    INDEX `idx_role_id` (`role_id`),
    INDEX `idx_access_id` (`access_id`)
);
-- +migrate Down
DROP TABLE `role_access`;