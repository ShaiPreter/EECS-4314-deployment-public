const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const ClubSchema = new mongoose.Schema({
    name:{type:String,
        required:true},
    events:[mongoose.Types.ObjectId],
    university: {
        type:String,
        required: true
    }
});

ClubSchema.plugin(findOrCreate);

const Club = mongoose.model('Club', ClubSchema);

module.exports = Club;