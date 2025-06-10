const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  userId: {
    type: String, // Cambiado a String para Firebase UID
    required: true,
    index: true // Agregar índice para consultas más rápidas
  },
  date: {
    type: Date,
    required: true
  },
  activity: {
    type: String,
    required: true,
    enum: ['Cardio', 'Pesas', 'Yoga', 'Natación', 'Correr', 'Ciclismo', 'Crossfit', 'Pilates', 'Otro']
  },
  duration: {
    type: Number,
    required: true,
    min: 1 // Duración mínima de 1 minuto
  },
  notes: {
    type: String,
    maxlength: 500 // Limitar notas a 500 caracteres
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Índice compuesto para consultas eficientes por usuario y fecha
workoutSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('Workout', workoutSchema);