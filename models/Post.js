const { Schema, model, Types } = require("mongoose")

const postSchema = new Schema({
	text: { type: String, required: true },
	date: { type: Date, default: Date.now },
	owner: { type: Types.ObjectId, ref: 'User' }
})

module.exports = Post = model('Post', postSchema)