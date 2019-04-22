const mongo = require('mongoose');
const schema = mongo.Schema;
const TokenSchema = new schema({
    userId : {
        type:schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    token: { type: String,
        required: true 
    },
    createdAt: { type: Date,
        required: true,
        default: Date.now,
        expires: 43200
    }
});

module.exports = Token = mongo.model('Tokens',TokenSchema);
