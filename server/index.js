const express = require("express");

const Team = require("./components/Team.js");
const User = require("./components/User.js");
const Meeting = require("./components/Meeting.js");
const Message = require("./components/Message.js");
const { registerApplication, addData } = require('./services/Firestore.js');

const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send("Hello, World");
});

app.listen(PORT, () => console.log("Listening on: " + PORT));

console.log(Team.createNewTeam("Test", ["test"], []));
console.log(User.createNewUser("test", "test@test.com", "test1234"));
console.log(Meeting.createNewMeeting("Test meeting", "uuid", Date.now(), 1 * 60 * 60 * 1000, false));
console.log(Message.createNewMessage("texmid", "This is a test message", null));

registerApplication();

addData('users', {name: "karan", password: "helloworld"}).then(data => {
    console.log(data);
})