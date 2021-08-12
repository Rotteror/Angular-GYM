const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const commentSchema = new mongoose.Schema({
    author: { type: ObjectId, ref: 'User' },
    content: { type: String, required: [true, 'Comment content is required !'],
     maxLength: [300, 'Comment description cannot be more than 300 charachters'] },
    created_At: { type: Date, default: Date.now() },
})


module.exports = mongoose.model('Comment', commentSchema);