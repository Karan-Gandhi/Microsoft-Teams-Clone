const express = require("express");

const Team = require("./components/Team.js");
const User = require("./components/User.js");
const Meeting = require("./components/Meeting.js");
const Message = require("./components/Message.js");
const { registerApplication, addData, updateData, deleteData, readData } = require('./services/Firestore.js');

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

addData('users/data', {name: "karan", password: "helloworld"}).then(async data => {
    console.log(data);

    await addData('users/data' + Math.random(), {name: "karan", password: "helloworld"});
    await addData('users/data' + Math.random(), {name: "karan", password: "helloworld"});
    await addData('users/data' + Math.random(), {name: "karan", password: "helloworld"});
    await addData('users/data' + Math.random(), {name: "karan", password: "helloworld"});
    await addData('users/data' + Math.random(), {name: "karan", password: "helloworld"});
    await addData('users/data' + Math.random(), {name: "karan", password: "helloworld"});
    await addData('users/data' + Math.random(), {name: "karan", password: "helloworld"});
    
    console.log(await readData('users'));

    updateData('users', 'data', {name: "karan", password: "helloworld1234"}).then(data => {
        console.log(data);
        deleteData('users', 1).then(data => {
            console.log(data);
        });
    })
})