const mongoose = require('mongoose');
const schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;