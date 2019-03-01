

const uuid = require('uuid') 

class Task {

    constructor(partnerID, consultancyID,description , requiredSkills , payment , finalProduct , timeLine , lifeCycle, category ,
         yearsOfExperience , done ,  ratePartnerDoer , ratePartnerConsultancy,assignedPerson ){
        this.taskID = uuid.v4() ;  
        // this.taskID = taskID ;  ----> for only testing   
        this.partnerID = partnerID ; 
        this.consultancyID = consultancyID ; 
        this.description = description ;
        this.payment = payment ;
        this.requiredSkills = requiredSkills ; 
        this.finalProduct = finalProduct ;  
        this.timeLine = timeLine ;
        this.lifeCycle = lifeCycle ;  
        this.category = category ; 
        this.yearsOfExperience = yearsOfExperience ; 
        this.done = done ;
        this.ratePartnerDoer =ratePartnerDoer ; 
        this.ratePartnerConsultancy = ratePartnerConsultancy ;
        this.assignedPerson = assignedPerson ; 
        const date = new Date() ; 
        this.postedTime = date.toLocaleString();


    } ; 

} ; 

module.exports = Task 