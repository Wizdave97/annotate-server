"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sockets = {};
var socketHandler = function (io) { return function (socket) {
    if (!sockets.hasOwnProperty(socket.id)) {
        sockets[socket.id] = socket;
    }
}; };
exports.default = socketHandler;
