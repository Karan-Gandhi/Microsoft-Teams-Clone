const uuid = require("uuid");
const Message = require("./Message.js");

class Team {
    constructor(id, admins, members, title, activeMeetings, messages, feed) {
        this.id = id;
        this.title = title;
        this.admins = admins;
        this.members = members;
        this.activeMeetings = activeMeetings;
        this.messages = messages;
        this.feed = feed;
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
        this.feed.push(Message.createNewMessage(this.id, `${User.getUserFromID(memberID).name} joined`, null));
    }

    addMessage(message) {
        this.messages.push(message);
        this.feed.push(message);
    }

    addMeeting(meeting) {
        this.activeMeetings.push(meeting.id);
        this.feed.push(meeting);
    }

    updateDatabase() {
        // some firebase stuff
    }

    static createNewTeam(title, admins, members) {
        return new Team(uuid.v4(), admins, members, title, new Array(), new Array());
    }

    static getTeamFromID(teamID) {
        // some firebase stuff
    }
}

module.exports = Team;