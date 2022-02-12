const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

//Define a schema
const DozentSchema = new mongoose.Schema({
    mail:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    session: [{
        token: {
            type: String
        }
    }]
});

DozentSchema.pre('save', function (next) {
    let user = this
    let costFactor = 10

    if (user.isModified('password')) {
        user.password = bcrypt.hashSync(user.password, costFactor)
    }

    next()
})

DozentSchema.methods.generateSession = async function () {
    const user = this

    const id = uuidv4()

    user.session.push({token: id})
    await user.save()

    return id
}

DozentSchema.statics.findByCredentials = function (name, password) {
    let User = this;
    return User.findOne({
        name: {
            $regex : new RegExp(name, "i") }
    }).then((user) => {
        if (!user)
            return Promise.reject();

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) resolve(user);
                else reject();
            })
        })
    });
}

//Create Model
const Dozent = mongoose.model('Dozent', DozentSchema);

//Export Model
module.exports = Dozent;

