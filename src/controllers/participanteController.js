import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";
import { verificarEmailExistente } from "../helpers/authParticipante.js";

export const registerParticipantes = (req, res) => {
    const { nome, email } = req.body;
  
    if (!nome || !email) {
        return res.status(400).json({ msg: "Preencha todos os campos obrigatórios." });
    }
  
    // Verificar se o e-mail já existe
    verificarEmailExistente(email, (err, existe) => {
        if (err) {
            return res.status(500).json({ msg: "Erro ao verificar e-mail." });
        }

        if (existe) {
            return res.status(400).json({ msg: "E-mail já está em uso." });
        }
  
        const id = uuidv4();
  
        const sql = "INSERT INTO participantes (participante_id, nome, email) VALUES (?, ?, ?)";
  
        conn.query(sql, [id, nome, email], (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: "Erro ao criar o participante." });
            }
            res.status(201).json({ msg: "Participante criado com sucesso!", id });
        });
    });
};

export const registerParticipantesEvents = (req, res) => {
  const { participante_id, evento_id } = req.body;

  if (!participante_id || !evento_id) {
    return res.status(400).json({ error: 'Dados incompletos' });
  }

  const query = 'UPDATE eventos SET participante_id = ? WHERE evento_id = ?';

  conn.query(query, [participante_id, evento_id], (err, results) => {
    if (err) {
      console.error('Erro ao inscrever participante:', err);
      return res.status(500).json({ error: 'Erro ao inscrever participante' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }

    res.status(200).json({ message: 'Participante inscrito com sucesso' });
  });
};