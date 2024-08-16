import conn from "../config/conn.js";

//tive que fazer essa desgraça no dia 3
export const verificarEmailExistente = (email, callback) => {
    const sql = "SELECT * FROM participantes WHERE email = ?";
  
    conn.query(sql, [email], (err, results) => {
        if (err) {
            console.error(err);
            return callback(err, null);
        }
        callback(null, results.length > 0);
    });
};