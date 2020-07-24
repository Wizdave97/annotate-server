"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_yoga_1 = require("graphql-yoga");
var client_1 = require("@prisma/client");
var socket_io_1 = __importDefault(require("socket.io"));
var query_1 = __importDefault(require("./resolvers/query"));
var mutation_1 = __importDefault(require("./resolvers/mutation"));
var socketHandler_1 = __importDefault(require("./socketIo/socketHandler"));
var resolvers = {
    Query: query_1.default,
    Mutation: mutation_1.default,
};
var prisma = new client_1.PrismaClient();
var server = new graphql_yoga_1.GraphQLServer({
    typeDefs: './dist/schema/schema.graphql',
    resolvers: resolvers,
    context: function (request) { return (__assign(__assign({}, request), { prisma: prisma })); }
});
server.start(function () { return console.log('Server is listening on http://localhost:4000'); }).then(function (server) {
    var io = socket_io_1.default(server);
    io.on('connection', socketHandler_1.default(io));
});
