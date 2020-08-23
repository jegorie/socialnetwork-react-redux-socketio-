const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const config = require('config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const path = require('path')

const User = require('./models/User')
const ChatRoom = require('./models/ChatRoom')

const PORT = process.env.POST || config.get('port')

const app = express()
// const server = http.createServer(app)
// test
mongoose.connect(config.get('bdUrl'), {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
})
const server = app.listen(PORT)
// end test
const io = socketio.listen(server)

app.set('port', PORT)

app.use(express.json({ extended: true }))
app.use(bodyParser.json())

io.use((socket, next) => {
	if (socket.handshake.query && socket.handshake.query.token) {
		const token = socket.handshake.query.token

		jwt.verify(token, config.get('jwtSecret'), (err, decoded) => {
			if (err) {
				socket.emit('authFail')
				return next()
			}
			socket.userId = decoded.userId
			User.findById(socket.userId).select('-password')
			.then(user => {
				socket.emit('loadUser', user)

				ChatRoom.find({ users: socket.userId})
				.then(rooms => {
					rooms.forEach(({id}) => {
						socket.join(id)
					})
				})
				

				next()
			})
		})
	} else {
		socket.emit('authFail')
		next()
	}
})

io.on('connection', socket => {
	// auth
	require('./sockets/auth.socket')(socket)
	// posts
	require('./sockets/posts.socket')(socket)
	//users
	require('./sockets/users.socket')(socket)
	// messages
	require('./sockets/messages.socket')(socket, io)


	socket.on('disconnect', () => {
		console.log('disconnected')
	})
})

app.use(express.static('client/build'))

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})