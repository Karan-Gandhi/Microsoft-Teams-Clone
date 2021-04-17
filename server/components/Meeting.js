const uuid = require("uuid");

class Meeting {
    constructor(id, title, teamID, startTime, duration, isReccuring, timeCreated, isStarted, participitants) {
        this.id = id;
        this.title = title;
        this.teamID = teamID;
        this.startTime = startTime;
        this.duration = duration;
        this.isReccuring = isReccuring;
        this.timeCreated = timeCreated;
        this.isStarted = isStarted;
        this.participitants = participitants;
    }

    updateDatabase() {
        // some firebase stuff
    }

    static createNewMeeting(title, teamID, startTime, duration, isReccuring) {
        return new (uuid.v4(), title, teamID, startTime, duration, isReccuring, Time.now(), false, new Array());
    }
}

module.exports = Meeting;