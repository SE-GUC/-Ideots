const uuid =require('uuid');

class Admin{
    constructor(name,email,passward,phone){
        this.name=name;
        this.email=email;
        this.passward=passward;
        this.phone=phone;
        this.id = uuid.v4();
        
    }
};

module.exports = Admin;

//tarazan was here guys