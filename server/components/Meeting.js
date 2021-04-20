const uuid = require("uuid");
const { addData, readData, deleteData } = require("../services/Firestore.js");

class Meeting {
    constructor(id, title, teamID, startTime, endTime, isReccuring, timeCreated, isStarted, participitants) {
        this.id = id;
        this.title = title;
        this.teamID = teamID;
        this.startTime = startTime;
        this.endTime = endTime;
        this.isReccuring = isReccuring;
        this.timeCreated = timeCreated;
        this.isStarted = isStarted;
        this.participitants = participitants;
    }

    async updateDatabase() {
        return await addData("meetings", this.id, Object.assign({}, this));
    }

    async delete() {
        return await deleteData("meetings", this.id);
    }

    static createNewMeeting(title, teamID, startTime, duration, isReccuring) {
        return new Meeting(uuid.v4(), title, teamID, startTime, duration, isReccuring, Date.now(), false, new Array());
    }

    static async getMeetingFromID(meetingID) {
        return await readData("meetings", meetingID);
    }

    static async getAllMeetings() {
        return await readData("meetings");
    }
}

module.exports = Meeting;
