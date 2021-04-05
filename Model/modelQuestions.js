const mongoose = require('mongoose');
// Definición de esquema y compilación en modelo
const questionsSchema = mongoose.Schema({
    pregunta: {
        type: String,
        required: true,
    },
    respuestas: {
        type: Array,
        required: true   
    },
    correcta: {
        type: Number,
        required: true
    },
    }
)

// export const user = mongoose.model('user', userSchema);
const Questions = mongoose.model('questions', questionsSchema);
module.exports = Questions;
// const User = mongoose.model('user',userSchema);