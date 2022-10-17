import { connection } from "../database/db.js";

export async function getMe(req, res) {
  const { id } = res.locals.user;

  try {
    const { rows: userUrls } = await connection.query(
      `
   SELECT users.id, users.name, 
   SUM(links."visitCount") AS "visitCount",
   json_agg(json_build_object(
  'id', links.id,
  'shortUrl', links."shortUrl",
  'url', links.url, 
  'visitCount', links."visitCount")) AS "shortenedUrls"
   FROM users
   JOIN links
   ON users.id = links."userId"
   WHERE users.id = $1
   GROUP BY users.id;
    `,
      [id]
    );

    if (userUrls.length === 0) {
      const { rows: userEmpty } = await connection.query(
        `SELECT id, name FROM users WHERE id = $1`,
        [id]
      );

      const UserValue = {
        id: userEmpty[0].id,
        name: userEmpty[0].name,
        visitCount: 0,
        shortenedUrls: [],
      };

      return res.status(200).send(UserValue);
    }

    res.status(200).send(userUrls[0]);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
