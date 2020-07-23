import React, { useContext } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import SocketContext from '../../../socketContext'

import style from './InputMessage.module.sass'

import { Input, Button } from 'antd'


// input message bar
const InputMessage = () => {
	const [text, setText] = useState('')
	const socket = useContext(SocketContext)
	const { _id: owner, firstName} = useSelector(state => state.auth.user)
	const roomId = useSelector(state => state.chatRoom.roomId)

	const sendMessage = () => {
		if (text.length > 0) {
			socket.emit('sendMessage', ({ text, owner, roomId, firstName }))
			setText('')
		}
	}

	return (
		<div className={style.wrapper}>
			<Input
				placeholder='Type here...'
				value={text}
				onChange={e => setText(e.target.value)}/>
			<Button onClick={() => {sendMessage(text)}}>Send</Button>
		</div>
	)
}

export default InputMessage
