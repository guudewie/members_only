require("dotenv").config();
const pool = require("../../config/pool");

/*** READ ***/

async function getMessages() {
  const result = await pool.query(`
    SELECT
      m.id,
      m.message,
      m.user_id,
      TO_CHAR(m.created_at, 'HH24:MI') AS time_of_day,
      TO_CHAR(m.created_at, 'Dy DD Mon YYYY') AS day_of_year,
      u.username,
      u.status
    FROM
      messages AS m
      LEFT JOIN users AS u ON m.user_id = u.id
    ORDER BY
      m.created_at
  `);
  return result.rows;
}

async function getUser(username) {
  const result = await pool.query(
    `SELECT * FROM users WHERE users.username = $1`,
    [username]
  );
  return result.rows[0];
}

async function getUserById(userId) {
  const result = await pool.query(`SELECT * FROM users WHERE users.id = $1`, [
    userId,
  ]);
  return result.rows[0];
}

/*** WRITE ***/

async function createMessage(userId, message) {
  const result = await pool.query(
    `
      INSERT INTO messages (user_id, message)
      VALUES ($1, $2)
      RETURNING *
    `,
    [userId, message]
  );

  return result.rows[0];
}

async function createUser(first_name, last_name, username, hash, status) {
  const result = await pool.query(
    `
    INSERT INTO users (first_name, last_name, username, pass_hash, status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `,
    [first_name, last_name, username, hash, status]
  );

  return result.rows[0];
}

/*** UPDATE ***/

async function updateUserStatus(userId, status) {
  const result = await pool.query(
    `
    UPDATE users
    SET status = $1
    WHERE id = $2
    RETURNING *
    `,
    [status, userId]
  );
  return result.rows[0];
}

/*** DELETE ***/

async function deleteUser(userId) {
  const result = await pool.query(
    `
      DELETE * FROM users WHERE users.id = $1
      VALUES ($1)
      RETURNING *
      `,
    [userId]
  );

  return result.rows[0];
}

async function deleteMessage(messageId) {
  const result = await pool.query(
    `
      DELETE
      FROM messages
      WHERE messages.id = $1
      `,
    [messageId]
  );

  return result.rows[0];
}

module.exports = {
  getMessages,
  getUser,
  getUserById,
  createMessage,
  createUser,
  deleteUser,
  deleteMessage,
  updateUserStatus,
};
