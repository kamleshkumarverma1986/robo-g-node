/**
 * Created by kaverma on 6/3/16.
 */

const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const UserSchema   = new Schema({

    created: { type: Date, required: true, default: Date.now },
    name: { type: String, required: true },
    pincode: { type: Number, required: true },
    contact : { type: Number, unique : true, required: true },
    email: { type: String, unique : true, required : true }
    
});

module.exports = mongoose.model('User', UserSchema);