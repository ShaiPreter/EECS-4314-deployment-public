const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    gender:{
        type: String,
        required: false
    },
    age:{
        type:Number,
        required: false
    },
    university:{
        type: String,
        required: true
    },
    clubsFollowed: [ {
        type:mongoose.Schema.Types.ObjectId,
        required: false,
        ref:"Club"
    },],
    promoterId: {
        type:mongoose.Schema.Types.ObjectId,
        required: false,
        ref:"Promoter"
    },
    interests:[String],
});

StudentSchema.plugin(findOrCreate);

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;