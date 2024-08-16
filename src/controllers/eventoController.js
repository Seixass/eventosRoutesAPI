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

  conn.query(
    sql,
    [id, titulo, data, palestrante_id || null],
    (err, results) => {
      if (err) {
        console.error("Erro ao criar o evento:", err);
        return res.status(500).json({ msg: "Erro ao criar o evento." });
      }
      res.status(201).json({ msg: "Evento criado com sucesso!", id });
    }
  );
};

export const getEventos = (req, res) => {
  const sql = /*sql*/ `
    SELECT * FROM eventos
  `;

  conn.query(sql, (err, data) => {
    if (err) {
      console.error("Erro ao buscar eventos:", err);
      return res.status(500).json({ msg: "Erro ao buscar os eventos." });
    }
    res.status(200).json(data);
  });
};

// Evento por um participante
export const enviarFeedback = (req, res) => {
  const { participanteId, eventoId, nota, comentario } = req.body;

  if (!participanteId || !eventoId || nota === undefined) {
      return res.status(400).json({ msg: "Preencha todos os campos obrigatórios." });
  }

  const feedbackId = uuidv4();
  const sql = "INSERT INTO feedback (feedback_id, participante_id, evento_id, nota, comentario) VALUES (?, ?, ?, ?, ?)";

  conn.query(sql, [feedbackId, participanteId, eventoId, nota, comentario || null], (err) => {
      if (err) {
          console.error('Erro ao enviar feedback:', err);
          return res.status(500).json({ msg: "Erro ao enviar feedback." });
      }
      res.status(201).json({ msg: "Feedback enviado com sucesso!" });
  });
};

// Evento com mais participantes
export const eventoMaisPopular = (req, res) => {
  const sql = `
      SELECT eventos.*, COUNT(participante_id) AS num_participantes
      FROM eventos
      GROUP BY eventos.evento_id
      ORDER BY num_participantes DESC
      LIMIT 1
  `;

  conn.query(sql, (err, data) => {
      if (err) {
          console.error('Erro ao buscar evento mais popular:', err);
          return res.status(500).json({ msg: "Erro ao buscar evento mais popular." });
      }
      res.status(200).json(data[0]);
  });
};

// Palestrante com mais participações
export const palestranteMaisAtivo = (req, res) => {
  const sql = `
      SELECT palestrantes.*, COUNT(eventos.palestrante_id) AS num_eventos
      FROM palestrantes
      JOIN eventos ON palestrantes.palestrante_id = eventos.palestrante_id
      GROUP BY palestrantes.palestrante_id
      ORDER BY num_eventos DESC
      LIMIT 1
  `;

  conn.query(sql, (err, data) => {
      if (err) {
          console.error('Erro ao buscar palestrante mais ativo:', err);
          return res.status(500).json({ msg: "Erro ao buscar palestrante mais ativo." });
      }
      res.status(200).json(data[0]);
  });
};

// Att os detalhes de um evento
export const editarEvento = (req, res) => {
  const { eventoId, titulo, data, palestrantesId } = req.body;

  if (!eventoId || !titulo || !data || !palestrantesId) {
      return res.status(400).json({ msg: "Preencha todos os campos obrigatórios." });
  }

  const sql = "UPDATE eventos SET titulo = ?, data = ?, palestrante_id = ? WHERE evento_id = ?";

  conn.query(sql, [titulo, data, palestrantesId[0], eventoId], (err, results) => {
      if (err) {
          console.error('Erro ao editar evento:', err);
          return res.status(500).json({ msg: "Erro ao editar evento." });
      }

      if (results.affectedRows === 0) {
          return res.status(404).json({ msg: "Evento não encontrado." });
      }

      res.status(200).json({ msg: "Evento editado com sucesso!" });
  });
};

// Cancelar um evento
export const cancelarEvento = (req, res) => {
  const { eventoId } = req.body;

  if (!eventoId) {
      return res.status(400).json({ msg: "Preencha todos os campos obrigatórios." });
  }

  const sql = "DELETE FROM eventos WHERE evento_id = ?";

  conn.query(sql, [eventoId], (err, results) => {
      if (err) {
          console.error('Erro ao cancelar evento:', err);
          return res.status(500).json({ msg: "Erro ao cancelar evento." });
      }

      if (results.affectedRows === 0) {
          return res.status(404).json({ msg: "Evento não encontrado." });
      }

      res.status(200).json({ msg: "Evento cancelado com sucesso!" });
  });
};

// Listar todos os eventos que um participante está inscrito
export const listarMeusEventos = (req, res) => {
  const { participanteId } = req.query;

  if (!participanteId) {
      return res.status(400).json({ msg: "Preencha todos os campos obrigatórios." });
  }

  const sql = `
      SELECT eventos.*
      FROM eventos
      WHERE participante_id = ?
  `;

  conn.query(sql, [participanteId], (err, data) => {
      if (err) {
          console.error('Erro ao listar eventos do participante:', err);
          return res.status(500).json({ msg: "Erro ao listar eventos do participante." });
      }
      res.status(200).json(data);
  });
};