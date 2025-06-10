// firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('./webgimnasio-49d4f-firebase-adminsdk-fbsvc-159b567b5a.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
