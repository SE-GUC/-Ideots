const uuid =require('uuid');

class Admin{
    constructor(name,mail,passward,phone){
        this.name=name;
        this.mail=mail;
        this.passward=passward;
        this.phone=phone;
        this.id = uuid.v4();
        
    }
};

module.exports = Admin;

//tarazan was here guys