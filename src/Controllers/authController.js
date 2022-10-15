import { connection } from "../database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
  const { email, password, name } = req.body;
  const salt = await bcrypt.genSalt();
  const passwordHash = bcrypt.hashSync(password, salt);

  try {
    const {
      rows: [checkEmail],
    } = await connection.query(`SELECT * FROM users WHERE email=$1;`, [email]);

    if (checkEmail) {
      return res.sendStatus(409);
    }

    await connection.query(
      `INSERT INTO users(name, email, password) VALUES ($1, $2, $3);`,
      [name, email, passwordHash]
    );
    return res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const verify = await connection.query(
      `SELECT * FROM users WHERE email=$1;`,
      [email]
    );

    if (!verify) {
      return res.sendStatus(401);
    }

    const token = jwt.sign(email, process.env.TOKEN_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).send(token);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
