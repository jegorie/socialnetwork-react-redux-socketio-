const User = require('../models/User')

module.exports = socket => {
	socket.on('getAllUsers', () => {
		User.find({ _id: { $ne: socket.userId } })
			.select('-password -email')
			.then(users => {
				socket.emit('sendAllUsers', users)
			})
	})

	socket.on('subToUser', candidate => {
		// 1 - make friend
		// 2 - make sub
		User.findById(candidate).then(candidate => {
			User.findById(socket.userId).then(user => {
				if (user.friends.includes(candidate._id)) {
					console.log('already friend')
				} else if (candidate.subs.includes(user._id)) {
					console.log('already sub')
				} else if (user.subs.includes(candidate._id)) {
					user.friends.push(candidate._id)
					candidate.friends.push(user._id)
					user.subs.splice(user.subs.indexOf(candidate._id), 1)

					Promise.all([user.save(), candidate.save()]).then(() =>
						socket.emit('subedToUser', {
							case: 1,
							user: user.friends,
							candidate,
						})
					)

				} else {
					candidate.subs.push(user._id)
					candidate.save().then(() => socket.emit('subedToUser', {
						case: 2,
						candidate
					}))
				}
			})
		})
	})

	socket.on('unsubToUser', candidate => {
		User.findById(candidate).then(candidate => {
			User.findById(socket.userId).then(user => {
				if (candidate.subs.includes(user._id)) {
					candidate.subs.splice(candidate.subs.indexOf(user._id), 1)
					candidate.save()
					.then(() => socket.emit('unsubedToUser', { case: 1, candidate }))

				} else if (candidate.friends.includes(user._id)) {
					candidate.friends.splice(candidate.friends.indexOf(user._id), 1)
					user.friends.splice(user.friends.indexOf(candidate._id), 1)
					user.subs.push(candidate._id)

					Promise.all([candidate.save(), user.save()])
					.then(() => socket.emit('unsubedToUser', {
						case: 2,
						user: user.friends,
						candidate
					}))
				}
			})
		})
	})

	socket.on('getFriends', () => {
		User.find({ friends: { $in: [socket.userId]} })
		.select('-password -email')
			.then(friends => {
				socket.emit('sendFriends', friends)
			})
	})
}
