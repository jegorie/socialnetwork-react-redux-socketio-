import React from 'react'
import { Avatar } from 'antd'

// Choosing the right avatar
const AvatarItem = ({photo, shape, size}) => {
	const photos = {
		'F': 'https://www.fillmurray.com/200/200',
		'N': 'https://www.placecage.com/200/200',
		'S': 'https://www.stevensegallery.com/200/200'
	}

	return (
		<Avatar shape={shape} size={size} src={photos[photo]}/>
	)
}

export default AvatarItem
