import { connection } from "../database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  const { email } = req.body;

  try {
    const { rows: verify } = await connection.query(
      `SELECT * FROM users WHERE email=$1;`,
      [email]
    );

    if (verify.length === 0) {
      return res.sendStatus(401);
    }

    const token = jwt.sign(
      { id: verify[0].id, email },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).send({ email, token });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
