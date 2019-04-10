const mongoose = require('mongoose')
const Schema = mongoose.Schema


// Creating the schema
const ReviewSchema = new Schema({
    reviewer:
    {
        type: Schema.Types.ObjectId,
        required:true
    },
    reviewed:{
        type:  Schema.Types.ObjectId,
        required:true
    },
    rate:{
        type :Number,
        required:true
    },
    comment:{
        type:String,
        required:false
    },
    reviewType:{
        type:Number ,enum:[0,1,2]                              // 0:partner -->member ,1:partner-->consultancy , 2:member -->event
    }
    
})


module.exports = Review = mongoose.model('reviews', ReviewSchema)




















// const uuid = require('uuid')
// class Review{
//     constructor(reviewer,reviewed,rate,comment,type){
//         this.id= uuid.v4()
//         this.reviewed=reviewed
//         this.reviewer=reviewer
//         this.type=type                                      // 0:partner -->member ,1:partner-->consultancy , 2:member -->event
//         this.rate=rate
//         this.comment=comment
//     };
// }
// module.exports = Review