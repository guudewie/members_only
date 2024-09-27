const pool = require("./pool");

/*** READ ***/

async function getMessages() {
  const result = await pool.query(`SELECT * FROM messages`);
  return result[0];
}

async function getUser(userId) {
  const result = await pool.query(`SELECT * FROM users WHERE users.id = $1`, [
    userId,
  ]);
  return result[0];
}

/*** WRITE ***/

async function createMessage(userId, title, message) {
  const result = await pool.query(
    `
          INSERT INTO messages (user_id, title, message)
          VALUES ($1, $2, $3)
          RETURNING *
          `[(userId, title, message)]
  );

  return result[0];
}

/*** UPDATE ***/

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

  return result[0];
}

async function deleteMessage(messageId) {
  const result = await pool.query(
    `
                  DELETE * FROM messages WHERE messages.id = $1
                  VALUES ($1)
                  RETURNING *
                  `,
    [messageId]
  );

  return result[0];
}
