
const uuid = require('uuid')
class Member{
    constructor (firstName,lastName,phoneNumber,birthDate,location,otherContacts,field,skills,interests,experience,certificates,email,password){
        this.id=uuid.v4()
        this.firstName=firstName
        this.lastName=lastName
        this.phoneNumber=phoneNumber
        this.birthDate=birthDate
        this.location=location
        this.otherContacts=otherContacts
        this.field=field
        this.skills=skills
        this.interests=interests
        this.tasks=[]
        this.attendedEvents=[]
        this.email=email
        this.password=password
        this.experience=experience
        this.rate = 5
        this.certificates=certificates
    };
}
module.exports = Member