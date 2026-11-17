const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },   
    link: {
        type: String, 
        required:true
    },
    topic: {
        type: String,
        required: true
    }, 
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required : true
    },
    notes: {
        type: String,
    },
    createdAt :{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Problem', problemSchema);