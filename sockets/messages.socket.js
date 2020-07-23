const User = require('../models/User')
const ChatRoom = require('../models/ChatRoom')
const Message = require('../models/Message')

module.exports = (socket, io) => {
	socket.on('join', room => {

		ChatRoom.findById(room)
		.then(room => {
			User.find({ _id: { $in: room.users }})
			.select('firstName lastName photo')
			.then(users => {
				io.to(room._id).emit('roomData', { users, messages: room.messages, roomId: room._id })
			})
		})
	})

	socket.on('createChatRoom', id => {
		ChatRoom.find({ users: { $all: [socket.userId, id] }})
		.then(room => {
			if (room.length < 1) {
				new ChatRoom({
					users: [socket.userId, id]
				})
				.save()
				.then(room => {
					socket.emit('chatRoomCreated', room._id)
				})
			} else {
				socket.emit('chatRoomCreated', room[0]._id)
			}
		})
	})

	socket.on('getAllChatRooms', () => {
		ChatRoom.find({ users: socket.userId})
		.select('users')
		.then(rooms => socket.emit('sendAllChatRooms', rooms))
	})

	socket.on('sendMessage', ({ text, owner, roomId, firstName }) => {
		ChatRoom.findById(roomId)
		.then(room => {
			room.messages.push({text, owner})
			return room.save()
		})
		.then(room => {
			const data = {
				notification: firstName,
				message: room.messages[room.messages.length - 1]
			}
			io.to(room._id).emit('message', data)
		})
	})
}