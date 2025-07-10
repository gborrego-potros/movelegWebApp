
const jwt = require('jsonwebtoken');
const CLAVE_SECRETA = 'mi_clave_secreta_super_segura'; // Debe ser igual a la que usas para firmar

function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ mensaje: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1]; // Formato "Bearer <token>"

  if (!token) {
    return res.status(403).json({ mensaje: 'Token inválido' });
  }

  try {
    const payload = jwt.verify(token, CLAVE_SECRETA);
    req.usuario = payload; // Aquí puedes acceder a los datos en la siguiente función
    next(); // Permite continuar
  } catch (err) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
}

module.exports = verificarToken;
