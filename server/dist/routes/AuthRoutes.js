"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = __importStar(require("jsonwebtoken"));
var express_1 = __importDefault(require("express"));
var Firestore_1 = require("../services/Firestore");
var FirestoreCollections_1 = __importDefault(require("../types/FirestoreCollections"));
var AuthUtils_1 = require("../utils/AuthUtils");
var router = express_1.default.Router();
router.get("/", function (_, res) {
    res.send("Hello world from auth");
});
router.post("/loginWithEmailAndPassword", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, tokens, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, AuthUtils_1.loginWithEmailAndPassword)(email, password)];
            case 2:
                tokens = _b.sent();
                res.json(tokens);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                res.status(403);
                res.send({ message: error_1.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// This will return the logged in user including the access token
router.post("/createUserWithEmailAndPassword", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, tokens, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, AuthUtils_1.createUserWithEmailAndPassword)(name, email, password)];
            case 2:
                tokens = _b.sent();
                res.json(tokens);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                res.status(403);
                res.send({ message: error_2.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/accessToken", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, tokenExists;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                refreshToken = req.body.refreshToken;
                if (refreshToken == null)
                    return [2 /*return*/, res.sendStatus(401)];
                return [4 /*yield*/, (0, Firestore_1.readData)(FirestoreCollections_1.default.REFRESH_TOKENS, refreshToken)];
            case 1:
                tokenExists = _a.sent();
                if (!tokenExists)
                    return [2 /*return*/, res.sendStatus(403)];
                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, function (err, user) {
                    if (err)
                        return res.sendStatus(403);
                    user === null || user === void 0 ? true : delete user.iat;
                    var accessToken = (0, AuthUtils_1.getAccessToken)(user);
                    res.json(accessToken);
                });
                return [2 /*return*/];
        }
    });
}); });
router.delete("/logout", function (req, res) {
    var refreshToken = req.body.refreshToken;
    if (!refreshToken)
        return res.sendStatus(401);
    (0, AuthUtils_1.logout)(refreshToken);
    res.sendStatus(204);
});
exports.default = router;