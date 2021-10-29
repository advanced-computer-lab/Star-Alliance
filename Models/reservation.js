const mongoose = require('mongoose');
const User = require('./user');
const Flight = require('./flight');
const Companion = require('./companion');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    user: {  
        type: Schema.Types.ObjectId,
        ref: 'User'
     },
    flight: {  
       type: Schema.Types.ObjectId,
       ref: 'Flight'
    },
    
   companions: [
    {
        type: Schema.Types.ObjectId,
        ref: 'companion'
    }
],
    cabinClass:{type:String, 
    enum : ['Business','Economy','First'],},
    baggageAllowance: {
        weight:{type: Number, default:23},
        number:{type: Number, default:2}
    }
});

/* 
reservationSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await User.deleteMany({
            _id: {
                $in: doc.users
            }
        })
    }
}); */

module.exports = mongoose.model('Reservation', reservationSchema);