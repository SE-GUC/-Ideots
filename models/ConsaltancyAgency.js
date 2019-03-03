const uuid =require('uuid');

class ConsaltancyAgency{
    constructor(name,description,specialization,website,email,fax,address,password,reports,boardMembers,partners,events){
        this.name=name;
        this.description=description;
        this.specialization=specialization;
        this.website=website;
        this.email=email;
        this.fax=fax;
        this.address=address;
        this.password=password;
        this.rate=5;
        this.reports=reports;
        this.boardMembers=boardMembers;
        this.partners=partners;
        this.events=events;
        this.id = uuid.v4();
    }
};

module.exports = ConsaltancyAgency;