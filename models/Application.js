// The  Application Model
const uuid=require('uuid')

class Application{

    constructor(applicantId,taskId) {       // applicantId : Member applying on a task
        this.applicantId=applicantId;
        this.taskId=taskId;
        this.date=new Date();;
        this.acceptence=0;                        // acceptance state for the application  -1: rejected  , 0: waiting  , 1: accepted
        this.id= uuid.v4();
    };
}

module.exports = Application;