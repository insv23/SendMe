-- Execute:
-- sqlite3 ./database/sendme.sqlite < ./database/init.sql 

-- Delete two tables if they exist
DROP TABLE IF EXISTS File;
DROP TABLE IF EXISTS Message;

PRAGMA foreign_keys = ON;

CREATE TABLE Message (
    id INTEGER PRIMARY KEY NOT NULL,
    creation_time TEXT NOT NULL,
    expiration_time TEXT NOT NULL,
    text TEXT
);

CREATE TABLE File (
    id INTEGER PRIMARY KEY NOT NULL,
    message_id INTEGER NOT NULL,
    file_type TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    file_name TEXT NOT NULL,
    FOREIGN KEY(message_id) REFERENCES Message(id)
);

-- 向 Message 表插入示例数据
INSERT INTO Message (id, creation_time, expiration_time, text) VALUES
(1, '2024-04-11T08:40:45.693Z', '2024-04-13T09:40:45.693Z', 'Hello, this is a text message');
-- 没有 text
INSERT INTO Message (id, creation_time, expiration_time) VALUES
(2, '2024-04-11T12:09:23.752Z', '2024-04-15T13:09:23.752Z');
-- 没有 file
INSERT INTO Message (id, creation_time, expiration_time, text) VALUES
(3, '2024-04-12T16:30:00.000Z', '2024-04-15T17:30:00.000Z', 'Hello, this is another text message'); 

-- 向 File 表插入示例数据
INSERT INTO File (id, message_id, file_type, file_size, file_name) VALUES
(1, 1, 'image/png', 400, 'image-1712997777670-396817087.png'),
(2, 2, 'image/png', 1000, 'image-1712997777661-136339393.png'),
(3, 2, 'image/png', 270, 'image-1712997449965-213012997.png');

