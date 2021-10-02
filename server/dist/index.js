"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("./routes/auth"));
var PORT = 5000;
var app = (0, express_1.default)();
app.get("/", function (_, res) {
    res.send("Hello, world ");
});
app.use("/auth", auth_1.default);
app.listen(PORT, function () { return console.log("Server started at port: " + PORT); });
