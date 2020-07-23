const isEmail = require('validator/lib/isEmail')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('config')

module.exports = socket => {
	socket.on('login', ({ email, password }, callback) => {
		if (!isEmail(email))
			return callback('Invalid email')

		if (password.length <= 0 && typeof password !== 'string')
			return callback('Invalid password')
		User.findOne({ email }, (err, user) => {
			if (err) return callback(err)

			if (!user) return callback('User is not found)')

			bcrypt.compare(
				password,
				user.password,
				(err, result) => {
					if (err) return callback(err)
					if (!result) return callback('Incorrect password')

					const token = jwt.sign(
						{ userId: user._id },
						config.get('jwtSecret'),
						{ expiresIn: '12h' }
					)

					socket.emit('authSuccess', token)
				}
			)
		})
	})

	socket.on('register', ({ email, password, firstName, lastName, photo }, callback) => {
		if (!isEmail(email))
			return callback('Incorrect data in registration')

		if (password.length <= 0 && typeof password !== 'string')
			return callback('Incorrect data in registration')

		User.findOne({ email })
		.then(user => {
			if (user) return callback('This email is already in use')

			return bcrypt.hash(password, 12)
		})
		.then(hashedPassword => {
			return new User({
				email,
				password: hashedPassword,
				firstName,
				lastName,
				photo
			})
		})
		.then((user) => {
			return user.save()
		})
		.then(user => {
			const token = jwt.sign(
				{ userId: user._id },
				config.get('jwtSecret'),
				{ expiresIn: '12h' }
			)

			socket.emit('authSuccess', token)
		})
		.catch(e => console.log('error:', e))
	})

	socket.on('getUser', token => {
		jwt.verify(token, config.get('jwtSecret'), (err, decoded) => {
			if (err) {
				socket.emit('authFail')
			}
			socket.userId = decoded.userId
			User.findById(socket.userId).select('-password')
			.then(user => {
				socket.emit('loadUser', user)
			})
		})
	})
}
