"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = {
    id: function (parent) { return parent.id; },
    firstName: function (parent) { return parent.firstName; },
    lastName: function (parent) { return parent.lastName; },
    email: function (parent) { return parent.email; },
    links: function (parent, args, context) {
        return context.prisma.user.findOne({ where: { id: parent.id } }).links();
    }
};
exports.default = User;
