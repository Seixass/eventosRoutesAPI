import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const registerEventos = (req, res) => {
  const { titulo, data, palestrante_id } = req.body;


  if (!titulo || !data) {
    return res
      .status(400)
      .json({ msg: "Preencha todos os campos obrigatórios." });
  }

  const id = uuidv4();


  const sql =
    "INSERT INTO eventos (evento_id, titulo, data, palestrante_id) VALUES (?, ?, ?, ?)";

  conn.query(sql, [id, titulo, data, palestrante_id || null], (err, results) => {
    if (err) {
      console.error('Erro ao criar o evento:', err);
      return res.status(500).json({ msg: "Erro ao criar o evento." });
    }
    res.status(201).json({ msg: "Evento criado com sucesso!", id });
  });
};

export const getEventos = (req, res) => {
  const sql = /*sql*/`
    SELECT * FROM eventos
  `;

  conn.query(sql, (err, data) => {
    if (err) {
      console.error('Erro ao buscar eventos:', err);
      return res.status(500).json({ msg: "Erro ao buscar os eventos." });
    }
    res.status(200).json(data);
  });
};
