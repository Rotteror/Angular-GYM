const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'Title is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    length: { type: String, required: [true, 'Length is required'] },
    bodyFocus: { type: String, required: [true, 'BodyFocus is required'] },
    averageDuration: { type: String, required: [true, 'Avg Duration is required'] },
    daysPerWeek: { type: String, required: [true, 'Days Per Week is required'] },
    owner: { type: ObjectId, ref: 'User' },
    followers: [{ type: ObjectId, ref: 'User', default: [] }],
    comments: [{ type: ObjectId, ref: 'Comment', default: [] }],
});

module.exports = mongoose.model('Post', postSchema)