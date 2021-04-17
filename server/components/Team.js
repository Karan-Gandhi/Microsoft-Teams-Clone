const uuid = require("uuid");

class Team {
    constructor(id, admins, members, title, activeMeetings, messages) {
        this.id = id;
        this.title = title;
        this.admins = admins;
        this.members = members;
        this.activeMeetings = activeMeetings;
        this.messages = messages;
    }

    addMember(memberID) {
        this.members.push(memberID);
    }

    promoteMember(memberID) {
        const memberIndex = this.members.indexOf(memberID);
        this.members.splice(memberIndex, 1);
        this.admins.push(memberID);
    }

    demoteMember(adminID, memberToDemoteID) {
        if (this.admins.indexOf(adminID) != -1) {
            const userIndex = this.admins.indexOf(memberToDemoteID);
            this.admins.splice(userIndex);
            this.members.push(memberToDemoteID);
        }
    }

    addMember(memberID) {
        this.memberID.push(memberID);
    }

    addMessage(message) {
        this.messages.push(message);
    }

    updateDatabase() {
        
    }

    static createNewTeam(title, admins, members) {
        return new Team(uuid.v4(), admins, members, title, new Array(), new Array());
    }

    static getTeamFromID(teamID) {
        // some firebase stuff
    }
}

module.exports = Team;