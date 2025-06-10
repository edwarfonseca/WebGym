const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validations/userValidation'); 
const admin = require('../firebase');
const verifyToken = require('../middlewares/verifyToken');

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Usuario registrado con éxito
 *       400:
 *         description: Error de validación o correo ya registrado
 */
// REGISTRO
// REGISTRO con Firebase Authentication
router.post('/register', async (req, res) => {
  const { error } = registerValidation(req.body); 
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { name, email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name
    });

    res.status(200).json({
      error: null,
      data: {
        uid: userRecord.uid,
        name: userRecord.displayName,
        email: userRecord.email
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso con token JWT
 *       400:
 *         description: Email no encontrado o contraseña incorrecta
 */
// LOGIN
/*router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: 'Email no encontrado' });

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).json({ error: 'Contraseña incorrecta' });

  const token = jwt.sign(
    { _id: user._id, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.header('auth-token', token).json({
    error: null,
    data: {
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    }
  });
});*/

// Ejemplo de verificación del token
router.post('/login', async (req, res) => {
  const { token } = req.body;

  if (!token) return res.status(400).json({ error: 'Token no proporcionado' });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    res.status(200).json({
      message: 'Login exitoso',
      data: {
        uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name || null
      }
    });
  } catch (err) {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
});



module.exports = router;
