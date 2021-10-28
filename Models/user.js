const mongoose = require('mongoose');
const Creditcard = require('./creditcard')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    passportNumber: {type:String, required:true},
    countryCode: {type:String, required:true},
    address: {
        country:String, 
        city:String,
        street:String,
        buildingNumber:Number,
        floorNumber:Number,
        appartmentNumber:Number
        },
    password: {type:String, required:true},
    birthDate: {type:String, required:true},
    job: {type:String},
    isAdmin: {type:Boolean, required:true},
    phoneNumbers: [{type:String}],
    creditcards: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Creditcard'
        }
    ]
});



userSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Creditcard.deleteMany({
            _id: {
                $in: doc.creditcards
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