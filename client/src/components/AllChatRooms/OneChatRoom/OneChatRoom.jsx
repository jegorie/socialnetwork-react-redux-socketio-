import React from 'react'
import AvatarItem from '../../AvatarItem/AvatarItem'

import { useHistory } from 'react-router-dom'

import { Row, Col, Button } from 'antd'
import style from './OneChatRoom.module.sass'


// Display one existing room with user info
const OneChatRoom = ({firstName, lastName, room, photo}) => {
	const history = useHistory()

	// click to open Chat room
	const onBtnClick = () => {
		history.push('/im?room=' + room)
	}

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
				<Button onClick={onBtnClick} type="link">Open dialog</Button>
			</Col>
		</Row>
	)
}

export default OneChatRoom
