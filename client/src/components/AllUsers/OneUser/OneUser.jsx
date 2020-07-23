import React from 'react'
import AvatarItem from '../../AvatarItem/AvatarItem'
import UserButton from './UserButton/UserButton'

import { Row, Col } from 'antd'
import style from './OneUser.module.sass'

// display one user
const OneUser = ({ firstName, lastName, id, subs, friends, myId, mySubs, photo }) => {
	return (
		<div>
			<Row className={style.wrapper}>
				<Col span={3}>
					<AvatarItem
						photo={photo}
						size={80}
					/>
				</Col>
				<Col>
					<h3 className={style.h}>{firstName + ' ' + lastName}</h3>
					<UserButton
						id={id}
						subs={subs}
						friends={friends}
						myId={myId}
						mySubs={mySubs}
					/>
				</Col>
			</Row>
		</div>
	)
}

export default OneUser
