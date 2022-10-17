import { func } from "joi";
import { nanoid } from "nanoid";
import { connection } from "../database/db.js";

export async function shortUrl(req, res) {
  const { url } = req.body;
  const { user } = res.locals;

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

  try {
    const { rows: searchUrl } = await connection.query(
      `SELECT id, "shortUrl", url FROM links WHERE id = $1;`,
      [id]
    );

    if (searchUrl.length === 0) {
      return res.sendStatus(404);
    }
    console.log(searchUrl);

    res.status(200).send(searchUrl[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function redirectUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    const { rows: searchShortUrl } = await connection.query(
      `SELECT url FROM links WHERE "shortUrl" = $1;`,
      [shortUrl]
    );

    if (searchShortUrl.length === 0) {
      return res.sendStatus(404);
    }

    connection.query(
      `UPDATE links SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1;`,
      [shortUrl]
    );
    res.redirect(searchShortUrl[0].url);
  } catch (err) {
    onsole.error(err);
    res.sendStatus(500);
  }
}

export async function deleteUrl(req, res) {}
