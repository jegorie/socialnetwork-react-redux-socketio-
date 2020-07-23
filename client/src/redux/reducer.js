import auth from './reducers/authReducer'
import error from './reducers/errorReducer'
import myPosts from './reducers/postReducer'
import allUsers from './reducers/allUsersReducer'
import friends from './reducers/friendsReducer'
import allPosts from './reducers/allPostsReducer'
import chatRoom from './reducers/chatRoomReducer'
import allChatRooms from './reducers/allChatRoomsReducer'
import { combineReducers } from "redux";

export const appReducer = combineReducers({
	auth,
	error,
	myPosts,
	friends,
	allUsers,
	allPosts,
	chatRoom,
	allChatRooms,
});