import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"

import { useDispatch } from 'react-redux'
import { login } from '../../redux/actions/login'

import SocketContext from '../../socketContext'

import { Form, Input, Button, Typography, Radio } from "antd"

const { Title } = Typography;

// style's settings
const formItemLayout = {
	layout: 'vertical',
	labelCol: {
		xs: { span: 24 },
		sm: { span: 0 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 24 },
	},
};
const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 24,
			offset: 0,
		},
	},
};


// register new user
const Register = () => {

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [photo, setPhoto] = useState('F')

	const dispatch = useDispatch()
	const socket = useContext(SocketContext)

	useEffect(() => {
		socket.on('authSuccess', token => {
			dispatch(login(token))
			socket.emit('getUser', token)
		})
		return () => {
			socket.off('loginSuccess')
		}
	}, [socket, dispatch])

	const onRegisterClick = () => {
		if (email && password && firstName && lastName && photo)
			socket.emit('register', { email, password, firstName, lastName, photo }, err => {
				alert(err)
			})
	}

	return (
		<div className='authWrapper'>
			<Title>Join us!</Title>
			<Form {...formItemLayout} name='register' scrollToFirstError>
				<Form.Item
					name='email'
					rules={[
						{
							type: "email",
							message: "The input is not valid E-mail!",
						},
						{
							required: true,
							message: "Please input your E-mail!",
						},
					]}
				>
					<Input
						placeholder='E-mail'
						value={email}
						onChange={e => setEmail(e.target.value)} />
				</Form.Item>

				<Form.Item
					name='password'
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
					]}
					hasFeedback
				>
					<Input.Password
						placeholder='Password'
						value={password}
						onChange={e => setPassword(e.target.value)} />
				</Form.Item>

				<Form.Item
					name='confirm'
					dependencies={["password"]}
					hasFeedback
					rules={[
						{
							required: true,
							message: "Please confirm your password!",
						},
						({ getFieldValue }) => ({
							validator(rule, value) {
								if (
									!value ||
									getFieldValue("password") === value
								) {
									return Promise.resolve();
								}
								return Promise.reject(
									"The two passwords that you entered do not match!",
								);
							},
						}),
					]}
				>
					<Input.Password placeholder='Confirm Password' />
				</Form.Item>

				<Form.Item
					name='firstName'
					rules={[
						{
							required: true,
							message: "Please input your first name!",
							whitespace: true,
						},
					]}
				>
					<Input
						placeholder='Your first name'
						value={firstName}
						onChange={e => setFirstName(e.target.value)} />
				</Form.Item>
				<Form.Item
					name='lastName'
					rules={[
						{
							required: true,
							message: "Please input your last name!",
							whitespace: true,
						},
					]}
				>
					<Input
						placeholder='Your last name'
						value={lastName}
						onChange={e => setLastName(e.target.value)} />
				</Form.Item>

				<Form.Item name="radio-group" label="Choose a photo">
					<Radio.Group
						onChange={e => setPhoto(e.target.value)}
						defaultValue='F'>
							<Radio value="F">Fill Murray</Radio>
							<Radio value="N">Nicolas Cage</Radio>
							<Radio value="S">Steven Seagal</Radio>
					</Radio.Group>
				</Form.Item>

				<Form.Item {...tailFormItemLayout}>
					<Button type='primary' htmlType='submit' onClick={onRegisterClick}>
						Register
					</Button>
				</Form.Item>
				<Form.Item>
					{"Or just "}
					<Link to='/'>Login</Link>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Register;
