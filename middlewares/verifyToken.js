const admin = require('../firebase');

const verifyToken = async (req, res, next) => {
  const token = req.header('auth-token'); 
  if (!token) return res.status(401).json({ error: 'Acceso denegado' });

  try {
    // Verificar token de Firebase
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Agregar información del usuario al request
    req.user = {
      _id: decodedToken.uid,
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || decodedToken.email
    };
    
    next();
  } catch (err) {
    res.status(400).json({ error: 'Token no válido' });
  }
};

module.exports = verifyToken;