const uuid = require("uuid");
const Message = require("./Message.js");
const { addData, readData, deleteData } = require("../services/Firestore");

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
        this.messages.push(Object.assign({}, message));
        this.feed.push(Object.assign({}, message));
    }

    addMeeting(meeting) {
        this.activeMeetings.push(meeting.id);
        this.feed.push(Object.assign({}, meeting));
    }

    async delete() {
        return await deleteData("teams", this.id);
    }

    async updateDatabase() {
        return await addData("teams", this.id, Object.assign({}, this));
    }

    static createNewTeam(title, admins, members) {
        return new Team(uuid.v4(), admins, members, title, [], [], []);
    }

    static async getTeamFromID(teamID) {
        return await readData("teams", teamID);
    }

    static async getAllTeams() {
        return await readData("teams");
    }
}

module.exports = Team;
