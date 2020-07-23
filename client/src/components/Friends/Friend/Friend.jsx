import React, { useContext, useEffect } from 'react'

import { useHistory } from 'react-router-dom'
import SocketContext from '../../../socketContext'

import { Row, Col, Button } from 'antd'
import style from './Friend.module.sass'
import AvatarItem from '../../AvatarItem/AvatarItem'


// Friend component
const Friend = ({ firstName, lastName, id, photo }) => {
	const socket = useContext(SocketContext)
	const history = useHistory()

	// Open or create chatroom
	const onBtnClick = () => {
		socket.emit('createChatRoom', id)
	}

	useEffect(() => {
		socket.on('chatRoomCreated', room => {
			history.push('/im?room=' + room)
		})

		return () => socket.off('chatRoomCreated')
	}, [socket, history])

	return (
		<Row className={style.wrapper}>
			<Col span={3}>
				<AvatarItem
					photo={photo}
					size={80}
				/>
			</Col>
			<Col>
				<h3 className={style.h}>{firstName + ' ' + lastName}</h3>
				<Button onClick={onBtnClick} type="link">Send message</Button>
			</Col>
		</Row>
	)
}

// `/chat?name=${name}&room=${room}`

export default Friend