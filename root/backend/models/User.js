const mongo = require('mongoose');
const schema = mongo.Schema;

const UserSchema = new schema({
    type:{
        type:String,
        required:true,

        enum:['partner','member','consultancy_agency']
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    rate:{
        type:Number,
        default:5
    },
    //consaltancy
    description:{
        type:String
    },
    specialization:{
        type:[String]
    },
    website:{
        type:String
    },
    fax:{
        type:String
    },
    address:{
        type:Object
    },
    reports:{
        type:[String]
    },
    boardMembers:{
        type:[String]
    },
    partners:{
        type:[schema.Types.ObjectId],
        ref:'Users'
    },
    events:{
        type:[schema.Types.ObjectId],
        ref:'events'
    },
    //member
    phoneNumber:{
        type:String
    },
    birthDate:{
        type:Date
    },
    location:{
        type:Object
    },
    otherContacts:{
        type:[String]
    },
    field:{
        type:[String]
    },
    skills:{
        type:[String]
    },
    interests:{
        type:[String]
    },
    tasks:{
        type:[schema.Types.ObjectId],
        ref:'tasks'
    },
    attendedEvents:{
        type:[schema.Types.ObjectId],
        ref:'events'
    },
    experience:{
        type:[String]
    },
    certificates:{
        type:[String]
    },
    //partner
    basicBussinesInformation:{
        type:Object
    },
    boardMembers:{
        type:[String]
    },
    fieldOfWork:{
        type:[String]
    },

    // partners:{
    //     type:[schema.Types.ObjectId]
    // },

    eventOrganized:{
        type:[schema.Types.ObjectId],
        ref:'events'
    },
    formFeedBack:{
        type:Object
    },
    pastProjects:{
        type:Object
    },
    contactInfo:{
        type:Object
    }
});

module.exports = User = mongo.model('Users',UserSchema);
