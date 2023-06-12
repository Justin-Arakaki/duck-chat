CREATE TABLE
  users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    hashed_password VARCHAR(194) NOT NULL,
    last_login DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE
  rooms (
    room_id INT PRIMARY KEY AUTO_INCREMENT,
    room_name VARCHAR(50) NOT NULL,
    created_by INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users (user_id)
  );

CREATE TABLE
  messages (
    message_id INT PRIMARY KEY AUTO_INCREMENT,
    room_id INT,
    user_id INT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms (room_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
  );

CREATE TABLE
  friendships (
    friendship_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id1 INT,
    user_id2 INT,
    FOREIGN KEY (user_id1) REFERENCES users (user_id),
    FOREIGN KEY (user_id2) REFERENCES users (user_id),
    CHECK (user_id1 < user_id2)
  );

CREATE TABLE
  room_members (
    room_member_id INT PRIMARY KEY AUTO_INCREMENT,
    room_id INT,
    user_id INT,
    FOREIGN KEY (room_id) REFERENCES rooms (room_id) ON UPDATE RESTRICT ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
  );
