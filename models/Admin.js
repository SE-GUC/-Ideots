const mongo = require('mongoose');
const schema = mongo.Schema;

const AdminSchema = new schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
});

module.exports = Admin = mongo.model('Admins',AdminSchema);