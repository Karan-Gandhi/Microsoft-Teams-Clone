"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = require("dotenv");
var AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
var APIRoutes_1 = __importDefault(require("./routes/APIRoutes"));
var PORT = 5000;
var app = (0, express_1.default)();
app.use(express_1.default.json());
(0, dotenv_1.config)();
app.get("/", function (_, res) {
    res.send("Hello, world");
});
app.use("/auth", AuthRoutes_1.default);
app.use("/api", APIRoutes_1.default);
app.listen(PORT, function () { return console.log("Server started at port: " + PORT); });
