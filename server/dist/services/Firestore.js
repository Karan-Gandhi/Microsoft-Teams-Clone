"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDataWhere = exports.deleteData = exports.readData = exports.addData = void 0;
var Firebase_1 = require("./Firebase");
var addData = function (collection, document, data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Firebase_1.db.collection(collection).doc(document).set(data)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.addData = addData;
var readData = function (collection, document) { return __awaiter(void 0, void 0, void 0, function () {
    var doc, snapshots, res_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!!document) return [3 /*break*/, 2];
                return [4 /*yield*/, Firebase_1.db.collection(collection).doc(document).get()];
            case 1:
                doc = _a.sent();
                if (!doc.exists) {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, doc.data()];
            case 2: return [4 /*yield*/, Firebase_1.db.collection(collection).get()];
            case 3:
                snapshots = _a.sent();
                res_1 = [];
                snapshots.forEach(function (snapshot) { return res_1.push(snapshot.data()); });
                return [2 /*return*/, res_1];
        }
    });
}); };
exports.readData = readData;
var deleteData = function (collection, document) { return __awaiter(void 0, void 0, void 0, function () {
    var deleteCollection, deleteQueryBatch_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!!document) return [3 /*break*/, 2];
                return [4 /*yield*/, Firebase_1.db.collection(collection).doc(document).delete()];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                deleteCollection = function (collectionPath, batchSize) { return __awaiter(void 0, void 0, void 0, function () {
                    var collectionRef, query;
                    return __generator(this, function (_a) {
                        collectionRef = Firebase_1.db.collection(collectionPath);
                        query = collectionRef.orderBy("__name__").limit(batchSize);
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                deleteQueryBatch_1(query, resolve).catch(reject);
                            })];
                    });
                }); };
                deleteQueryBatch_1 = function (query, resolve) { return __awaiter(void 0, void 0, void 0, function () {
                    var snapshot, batchSize, batch;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, query.get()];
                            case 1:
                                snapshot = _a.sent();
                                batchSize = snapshot.size;
                                if (batchSize === 0) {
                                    resolve();
                                    return [2 /*return*/];
                                }
                                batch = Firebase_1.db.batch();
                                snapshot.docs.forEach(function (doc) {
                                    batch.delete(doc.ref);
                                });
                                return [4 /*yield*/, batch.commit()];
                            case 2:
                                _a.sent();
                                process.nextTick(function () {
                                    deleteQueryBatch_1(query, resolve);
                                });
                                return [2 /*return*/];
                        }
                    });
                }); };
                return [4 /*yield*/, deleteCollection(collection, 10)];
            case 3: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.deleteData = deleteData;
var readDataWhere = function (collection, fieldPath, opStr, value) { return __awaiter(void 0, void 0, void 0, function () {
    var snapshots, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Firebase_1.db.collection(collection).where(fieldPath, opStr, value).get()];
            case 1:
                snapshots = _a.sent();
                res = [];
                snapshots.forEach(function (snapshot) { return res.push(snapshot.data()); });
                return [2 /*return*/, res];
        }
    });
}); };
exports.readDataWhere = readDataWhere;
