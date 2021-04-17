const uuid = require("uuid");
const Team = require("./Team.js");

class User {
    constructor(id, name, email, password, teams) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.teams = teams;
    }

    isAdmin(teamID) {
        if (this.teams.indexOf(teamID) == -1) return false;
        return Team.getTeamFromID(teamID).admins.indexOf(this.id) != -1;
    }

    joinTeam(teamID) {
        // check if it is a valid team
        const teamToJoin = Team.getTeamFromID(teamID);
        if (teamToJoin == null) return new Error("Team dosen't exist");
        
        teamToJoin.addMember(this.id);
        this.teams.push(teamID);
    }

    updateDatabase() {
        // some firebase stuff
    }

    static createNewUser(name, email, password) {
        return new User(uuid.v4(), name, email, password, new Array());
    }
}

module.exports = User;