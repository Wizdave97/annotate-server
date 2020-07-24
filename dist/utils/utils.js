"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.APP_SECRET = 'GraphQLIsAwesome';
exports.getUserId = function (context) {
    var Authorization = context.request.get('Authorization');
    if (Authorization) {
        try {
            var token = Authorization.replace('Bearer ', '');
            var userId = jsonwebtoken_1.default.verify(token, exports.APP_SECRET).userId;
            return userId;
        }
        catch (err) {
            throw new Error('Invalid Authentication token');
        }
    }
    throw new Error('Not Authenticated');
};
