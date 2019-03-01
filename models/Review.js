const uuid = require('uuid')
class Review{
    constructor(reviewer,reviewed,rate,comment,type){
        this.id= uuid.v4()
        this.reviewed=reviewed
        this.reviewer=reviewer
        this.type=type                                      // 0:partner -->member ,1:partner-->consultancy , 2:member -->event
        this.rate=rate
        this.comment=comment
    };
}
module.exports = Review