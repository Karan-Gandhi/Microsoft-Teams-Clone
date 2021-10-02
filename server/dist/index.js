"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("./routes/auth"));
var dotenv_1 = require("dotenv");
var PORT = 5000;
var app = (0, express_1.default)();
app.use(express_1.default.json());
(0, dotenv_1.config)();
app.get("/", function (_, res) {
    res.send("Hello, world ");
});
app.use("/auth", auth_1.default);
app.listen(PORT, function () { return console.log("Server started at port: " + PORT); });
