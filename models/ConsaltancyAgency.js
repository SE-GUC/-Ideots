const uuid =require('uuid');

class ConsaltancyAgency{
    constructor(name,description,specialization,website,
        mail,fax,address,password,rate,reports,
        boardMembers,partners,events){
        this.name=name;
        this.description=description;
        this.specialization=specialization;
        this.website=website;
        this.mail=mail;
        this.fax=fax;
        this.address=address;
        this.password=password;
        this.rate=rate;
        this.reports=reports;
        this.boardMembers=boardMembers;
        this.partners=partners;
        this.events=events;
        this.id = uuid.v4();
    }
};

module.exports = ConsaltancyAgency;