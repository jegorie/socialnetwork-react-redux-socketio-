import React from 'react'
import AvatarItem from '../../../AvatarItem/AvatarItem';

import moment from 'moment'
import { Comment } from 'antd';

// message component
const Message = ({ owner, text, date, photo }) => {
	return (
		<Comment
			author={owner}
			
			avatar={
				<AvatarItem
					photo={photo}
				/>}
			content={
				<p>
					{text}
				</p>
			}
			datetime={
				<span>{moment(date).format('h:mm')}</span>
			}/>
	)
}

export default Message
