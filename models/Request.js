
const uuid = require('uuid')
class Request {
    constructor(partnerID ,date ,description ,consult ,feedback ) 
                {
                this.requestID = uuid.v4();
                this.partnerID = partnerID ,
                this.description = description;
                this.date = date;
                this.consult = consult;
                this.accepted = 0;                                  //-1 rejected , 0 pending , 1 accepted
                this.feedback = feedback;
            };
}

module.exports = Request