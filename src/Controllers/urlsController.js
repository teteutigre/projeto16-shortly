import { nanoid } from "nanoid";
import { connection } from "../database/db.js";

export async function shortUrl(req, res) {
  const { url } = req.body;
  const { user } = res.locals;

  console.log(user);

  const shortUrl = nanoid(8);

  try {
    await connection.query(
      `INSERT INTO links ("shortUrl", url, "userId") VALUES ($1, $2, $3);`,
      [shortUrl, url, user.id]
    );

    res.status(201).send({ shortUrl });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function getUrl(req, res) {
  const { id } = req.params;
}
