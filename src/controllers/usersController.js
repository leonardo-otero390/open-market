import connection from "../db.js";
import bcrypt from "bcrypt";

export async function insert(req, res) {
  const { nome: name, email, senha: password } = req.body;

  try {
    const emailSearch = await connection.query(
      `
        SELECT email FROM usuarios WHERE email = $1;
        `,
      [email]
    );
    if (emailSearch.rowCount) return res.sendStatus(409);

    const passwordHash = bcrypt.hashSync(password, 10);
    await connection.query(
      `INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3);`,
      [name, email, passwordHash]
    );
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
}