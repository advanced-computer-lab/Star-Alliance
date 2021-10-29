const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companionSchema = new Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    passportNumber: {type:String, required:true},
    countryCode: {type:String, required:true},
    phoneNumbers: [{type:String, required:true}],
    birthDate: {type:String, required:true},
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

module.exports = mongoose.model('Companion', companionSchema);