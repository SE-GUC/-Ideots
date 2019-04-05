const user = require('../models/User');

const validator =require('../validations/userValidations');
// GET all Users.
exports.get_All_Users = async(req, res) =>{
    try{
        const user = await User.find();
        if(user.length==0) res.status(404).send({error:"there is no user"});
        res.json({data : user});   
    }catch(error){
        res.json({error:error.message});
    }
};

// GET all members.
exports.get_All_Memebers = async(req, res) => {
    try{
        const Member = await User.find({type:'member'});
        if(Member.length==0) res.status(404).send({error:"there is no Member"});
        res.json({data : Member});
    }catch(error){
        res.json({error:error.message});
    }
};

//  GET User by id.
exports.get_Specific_User = async(req, res) =>{
    try{
        const id = req.params.id;
        console.log(id);
        const user =await User.findOne({_id:id});
        console.log(user);
        if(!user) res.status(404).send({error:"there is no User with this Id"});
        res.json(user);
    }catch(error) {
        res.json({error: error.message});
   } 
};

// Delete user By id
exports.delete_User = async(req, res) => {
    const requestedId = req.params.id;
    const user =await User.findOne({'_id':requestedId});
   //  console.log(user)
   if(!user) return res.status(404).send({error:"there is no User with this Id"});
       const deletedUser = await User.findByIdAndRemove(requestedId)
      res.json({data:deletedUser})
      
};
