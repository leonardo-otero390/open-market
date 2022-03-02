import connection from "../db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function insert(req, res) {
  const { email, senha: password } = req.body;

  try {
    const emailSearch = await connection.query(
      `
        SELECT * FROM usuarios WHERE email = $1;
        `,
      [email]
    );
    if (!emailSearch.rowCount) return res.sendStatus(401);
    const user = emailSearch.rows[0];
    if (!bcrypt.compareSync(password, user.senha)) return res.sendStatus(401);

    const token = uuid();
    await connection.query(
      `
            DELETE FROM sessoes WHERE "idUsuario"=$1;
        `,
      [user.id]
    );
    await connection.query(
      `
            INSERT INTO sessoes (token,"idUsuario") VALUES ($1, $2);
        `,
      [token, user.id]
    );
    res.status(200).send({ token: token, user: user.nome });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
