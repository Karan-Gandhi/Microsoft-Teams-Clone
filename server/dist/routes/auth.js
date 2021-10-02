"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get("/", function (_, res) {
    res.send("Hello world from auth");
});
// This will return the access token of the user
router.post("/loginWithEmailAndPassword", function (req, res) { });
// This will return the logged in user including the access token
router.post("/createUserWithEmailAndPassword", function (req, res) { });
exports.default = router;
