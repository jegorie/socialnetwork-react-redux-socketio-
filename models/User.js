const { Schema, model, Types } = require("mongoose")

const userSchema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	photo: { type: String, required: true },
	subs: [{ type: Types.ObjectId, ref: 'User' }],
	friends: [{ type: Types.ObjectId, ref: 'User' }]
})

module.exports = User = model('User', userSchema)