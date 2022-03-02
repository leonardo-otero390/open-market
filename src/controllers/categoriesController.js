import connection from "../db.js";

export async function insert(req, res) {
  const { nome: name } = req.body;
  if (typeof name !== "string" || name === "") res.sendStatus(400);
  try {
    const categoryAlreadyExists = await connection.query(
      `
        SELECT * FROM categorias WHERE nome = $1;
        `,
      [name]
    );
    if (categoryAlreadyExists.rowCount) return res.sendStatus(409);
    await connection.query(
      `INSERT INTO categorias (nome) VALUES ($1);`,
      [name]
    );
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
}
