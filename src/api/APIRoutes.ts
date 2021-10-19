enum APIRoutes {
	LOGIN = "/auth/loginWithEmailAndPassword",
	CREATE_USER = "/auth/createUserWithEmailAndPassword",
	RENEW_ACCESS_TOKEN = "/auth/accessToken",
	VERIFY_ACCESS_TOKEN = "/api",
	LOGOUT = "/auth/logout",
	GET_TEAMS = "/api/teams",
	CREATE_TEAM = "/api/teams/createTeam",
	JOIN_TEAM = "/api/teams/joinTeam",
	GET_TEAM_BY_ID = "/api/teams/",
	GET_TEAM_FEED = "/api/teams/feed/",
	SEND_MESSAGE = "/api/teams/sendMessage/",
	GET_USER_BY_ID = "/api/users/",
	SEARCH_USER_BY_EMAIL = "/api/users/searchUserByID/",
	GET_USER_INFO = "/api/users/userInfo",
	GET_TEAM_MEMBERS = "/api/teams/teamMembers/",
	ADD_USER_TO_TEAM = "/api/teams/addUser/",
	REMOVE_USER_FROM_TEAM = "/api/teams/removeUser/",
}

export default APIRoutes;
