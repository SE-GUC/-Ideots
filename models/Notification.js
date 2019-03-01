// The Notification Model
const uuid=require('uuid')

class Notification{
    
    constructor(content,recieverId,notifierId) {
        this.content= content;
        this.recieverId=recieverId;
        this.notifier=notifierId;
        this.date= new Date();
        this.isRead=false;
        this.id= uuid.v4();

    };
   
}

module.exports = Notification;