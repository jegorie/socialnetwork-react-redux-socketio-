import React from 'react'
import Message from './Message/Message'

import { useSelector } from 'react-redux'

import style from './Messages.module.sass'

// Display all messages
const Messages = () => {
	const { messages, users } = useSelector(state => state.chatRoom)
	
	let displayAllMessages = null

	if (messages.length > 0 && users.length > 0) {
		displayAllMessages = messages.map(msg => {
			const { firstName, photo } = users.find(user => user._id === msg.owner)
			return (
				<Message
					key={msg._id}
					text={msg.text}
					owner={firstName}
					date={msg.date}
					photo={photo}
				/>
			)
		})
		.reverse()
	}

	return (
		<div className={style.messages}>
			{displayAllMessages}
		</div>
	)
}

export default Messages
