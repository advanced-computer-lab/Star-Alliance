const mongoose = require('mongoose');
const User = require('./user');
const Flight = require('./flight');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
   flight: {  
       type: Schema.Types.ObjectId,
       ref: 'Flight'
    },
   users: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
],
});


reservationSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await User.deleteMany({
            _id: {
                $in: doc.users
            }
        })
    }
});

module.exports = mongoose.model('Reservation', reservationSchema);