const { Schema, model, Types } = require("mongoose")
const messageSchema = require('./Message')

const ChatRoomSchema = new Schema({
	users: [{ type: Types.ObjectId, ref: 'User', required: true }],
	messages: [messageSchema]
})

module.exports = ChatRoom = model('ChatRoom', ChatRoomSchema)
