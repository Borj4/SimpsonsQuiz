const mongoose = require('mongoose');
// Definición de esquema y compilación en modelo
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    
    },
    private: {
        type: Boolean,

    },
    }
)

// export const user = mongoose.model('user', userSchema);
const User = mongoose.model('users', userSchema);
module.exports = User;
// const User = mongoose.model('user',userSchema);