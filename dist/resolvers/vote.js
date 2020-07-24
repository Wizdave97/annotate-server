"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vote = {
    user: function (parent, args, context) {
        return context.prisma.vote.findOne({
            where: {
                id: parent.id
            }
        }).user();
    },
    link: function (parent, args, context) {
        return context.prisma.vote.findOne({
            where: {
                id: parent.id
            }
        }).link();
    },
};
exports.default = Vote;
