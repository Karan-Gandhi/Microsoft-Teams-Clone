const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const Team = require("./components/Team.js");
const User = require("./components/User.js");
const Meeting = require("./components/Meeting.js");
const Message = require("./components/Message.js");
const { registerApplication } = require("./services/Firestore.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile("./src/views/index.html", { root: __dirname });
});

app.get("/:fileName", (req, res) => {
    try {
        if (fs.existsSync(`./src/views/${req.params.fileName}.html`)) {
            res.sendFile(`./src/views/${req.params.fileName}.html`, { root: __dirname });
        } else {
            res.send("404 error");
        }
    } catch (err) {
        console.log(err);
    }
});

app.get("/css/:fileName", (req, res) => {
    res.sendFile(`./src/css/${req.params.fileName}`, { root: __dirname });
});

app.get("/js/:fileName", (req, res) => {
    res.sendFile(`./src/js/${req.params.fileName}`, { root: __dirname });
});

app.get("/images/:fileName", (req, res) => {
    res.sendFile(`./src/images/${req.params.fileName}`, { root: __dirname });
});

app.post("/createUser", (req, res) => {
    const { id, name, email, password } = req.body;
    const user = User.createNewUser(id, name, email, password);
    user.updateDatabase();
    res.json(user);
});

app.get("/getUserData/:uid", async (req, res) => {
    const userData = await User.getUserFromID(req.params.uid);
    console.log(userData);
    res.json(userData);
});

app.listen(PORT, async () => {
    registerApplication();
    console.log("Listening on: " + PORT + "!");

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
