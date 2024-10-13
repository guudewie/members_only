#! /usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");

const SQL = `

CREATE TYPE membership_status AS ENUM ('normal', 'member', 'admin');

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  username VARCHAR(20),
  pass_hash TEXT,
  status membership_status,
  created_at timestamp DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT,
  message TEXT,
  user_id INTEGER,
  created_at timestamp DEFAULT current_timestamp,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABSE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  await client.connect();
  console.log("connecting...");
  await client.query(SQL);
  console.log("executing...");
  await client.end();
  console.log("done");
}

main();
