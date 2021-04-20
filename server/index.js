const express = require("express");
const bodyParser = requier("body-parser");

const Team = require("./components/Team.js");
const User = require("./components/User.js");
const Meeting = require("./components/Meeting.js");
const Message = require("./components/Message.js");
const { registerApplication } = require("./services/Firestore.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser);

app.get("/", (req, res) => {
    res.send("Hello, World");
});

app.post("/createUser", (req, res) => {
    const { name, email, password } = req.body;

    const user = User.createNewUser(name, email, password);
    user.updateDatabase();

    res.json(user);
});

app.listen(PORT, async () => {
    registerApplication();
    console.log("Listening on: " + PORT);

    // const testUser = User.createNewUser("Test user", "test@test.com", "helloworld");
    // const testTeam = Team.createNewTeam("Test Team", [testUser.id], []);
    // const testMeeting = Meeting.createNewMeeting("Test Meeting", testTeam.id, 1000, 1000 * 60 * 60, false);

    // testTeam.addMeeting(testMeeting);
    // testTeam.addMessage(Message.createNewMessage(testTeam.id, "Test Body", testUser.id));

    // await testUser.updateDatabase();
    // await testMeeting.updateDatabase();
    // await testTeam.updateDatabase();

    // testTeam.title = "Hello, world";

    // await testTeam.updateDatabase();

    // setTimeout(async () => {
    //     await testUser.delete();
    //     await testMeeting.delete();
    //     await testTeam.delete();
    // }, 10 * 1000);
});
