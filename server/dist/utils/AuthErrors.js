"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidEmailOrPassword = exports.EmailAlreadyExistError = void 0;
exports.EmailAlreadyExistError = new Error("The given email already exists");
exports.InvalidEmailOrPassword = new Error("The given email or password doesn't exist");
