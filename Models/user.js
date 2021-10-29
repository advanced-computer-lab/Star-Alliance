const mongoose = require('mongoose');
const Creditcard = require('./creditcard')
const Flight = require('./flight')
const reservation = require('./reservation');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {type:String},
    lastName: {type:String},
    passportNumber: {type:String},
    countryCode: {type:String},
    address: {
        country:String, 
        city:String,
        street:String,
        buildingNumber:Number,
        floorNumber:Number,
        appartmentNumber:Number
        },
    password: {type:String},
    birthDate: {type:String},
    job: {type:String},
    isAdmin: {type:Boolean},
    phoneNumbers: [{type:String}],
    creditcards: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Creditcard'
        }
    ],
    /* flights: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Flight'
        }
    ] */
});


userSchema.post('findOneAndDelete', async function (doc) {
    console.log('findOneAndDelete Credit card', doc);    
    if (doc) {
        await Creditcard.deleteMany({
            _id: {
                $in: doc.creditcards
            }
        })

    }
});


userSchema.post('deleteMany', async function (doc) {
    console.log('doc.firstname = ?', doc);
    console.log('doc is Row ?', doc);    
    
    if (doc) {
        await reservation.deleteMany({
            user_id: {
                    $in: doc._id
            }
        })
    }
});


/* UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
}); */

module.exports = mongoose.model('User', userSchema);