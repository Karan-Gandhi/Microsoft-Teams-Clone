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
}

export default APIRoutes;
