const User = require('../models/User')
const Post = require('../models/Post')

module.exports = socket => {
	socket.on('getAllPosts', () => {
		User.find({ $or: [
			{ subs: socket.userId },
			{ friends: socket.userId },
			{ _id: socket.userId }
		]})
		.select('_id firstName lastName photo')
		.then(users => {
			Post.find({ owner: users })
			.then(posts => {
				socket.emit('loadAllPosts', { posts, owners: users })
			})
		})
	})

	socket.on('getMyPosts', () => {
		Post.find({ owner: socket.userId })
		.then(posts => {
			socket.emit('loadMyPosts', posts)
		})
	})

	socket.on('createNewPost', text => {
		new Post({
			text,
			owner: socket.userId
		})
		.save()
		.then(post => {
			socket.emit('createdNewPost', post)
		})
	})

	socket.on('deletePost', id => {
		Post.findById(id)
		.then(post => {
			if (post.owner == socket.userId) {
				post.remove()
				.then(() => socket.emit('deletedPost', post._id))
			}
		})
	})
}