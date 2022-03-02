import { validate as uuidValidate } from "uuid";
import connection from "../db.js";

export default async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  if (
    !authorization ||
    authorization.trim() === "" ||
    !authorization.includes("Bearer ")
  )
    return res.sendStatus(400);

  const token = authorization.replace("Bearer ", "");

  if (token.trim() === "") return res.sendStatus(422);
  if (!uuidValidate(token)) return res.sendStatus(400);

  try {
    const thisTokenUser = await connection.query(
      "SELECT * FROM sessoes WHERE token = $1;",
      [token]
    );

    if (!thisTokenUser.rowCount) return res.sendStatus(401);
    res.locals.userId = thisTokenUser.userId;
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
  return next();
}
