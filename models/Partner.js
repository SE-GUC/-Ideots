// The Partner Model
const uuid=require('uuid')

class Partner{

    constructor(basicBussinesInformation,
        boardMembers,
        fieldOfWork,
        partners,
        eventOrganized,
        formFeedBack,
        pastProjects,
        name,
        contactInfo,
        email,
        password
        

        
        ) {//entity for info
      
        this.basicBussinesInformation=basicBussinesInformation;
        this.boardMembers=boardMembers;
        this.fieldOfWork=fieldOfWork;
        this.partners=partners;
        this.eventOrganized=eventOrganized;
        this.formFeedBack=formFeedBack;
        this.pastProjects=pastProjects;
        this.rate=5;
        this.name=name;
        this.contactInfo=contactInfo;
        this.email=email;
        this.password=password;
        this.id= uuid.v4();
    };
    
    
}

module.exports = Partner;