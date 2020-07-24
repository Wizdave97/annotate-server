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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redis_1 = __importDefault(require("../redis/redis"));
var util_1 = require("util");
var getAsync = util_1.promisify(redis_1.default.get).bind(redis_1.default);
var Query = {
    annotations: function (parent, args, context) { return __awaiter(void 0, void 0, void 0, function () {
        var offset, count, pageCount, nextPage, annotations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    offset = args.page - 1;
                    return [4 /*yield*/, context.prisma.annotation.count({
                            where: {
                                accountId: args.accountId
                            }
                        })];
                case 1:
                    count = _a.sent();
                    pageCount = Math.floor(count / 10);
                    nextPage = null;
                    if (pageCount > args.page)
                        nextPage = args.page + 1;
                    return [4 /*yield*/, context.prisma.annotation.findMany({
                            where: {
                                accountId: args.accountId
                            },
                            take: 10,
                            skip: offset > 0 ? offset * 10 : 0,
                        })];
                case 2:
                    annotations = _a.sent();
                    return [2 /*return*/, { annotations: annotations, nextPage: nextPage }];
            }
        });
    }); },
    activeSessions: function (parent, args, context) { return __awaiter(void 0, void 0, void 0, function () {
        var sessions, sessionsArray, filteredSessionsArray, multi_1, response, execAsync;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAsync("activeSessions")];
                case 1:
                    sessions = _a.sent();
                    if (!sessions) return [3 /*break*/, 3];
                    sessionsArray = JSON.parse(sessions);
                    filteredSessionsArray = sessionsArray.filter(function (sessionId) {
                        return sessionId.endsWith(args.accountId.toString());
                    });
                    multi_1 = redis_1.default.multi();
                    filteredSessionsArray.forEach(function (sessionId) {
                        multi_1.get(sessionId);
                    });
                    response = void 0;
                    execAsync = util_1.promisify(multi_1.exec).bind(multi_1);
                    return [4 /*yield*/, execAsync()];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, response.forEach(function (obj) { return JSON.parse(obj); })];
                case 3: return [2 /*return*/, null];
            }
        });
    }); }
};
exports.default = Query;
