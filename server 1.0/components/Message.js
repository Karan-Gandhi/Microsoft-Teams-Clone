class Message {
    constructor(teamID, messageBody, sentUserID, timeCreated) {
        this.teamID = teamID;
        this.messageBody = messageBody;
        this.sentUserID = sentUserID;
        this.timeCreated = timeCreated;
    }

    static createNewMessage(teamID, messageBody, sentUserID) {
        return new Message(teamID, messageBody, sentUserID, Date.now());
    }
}

module.exports = Message;