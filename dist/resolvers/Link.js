"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Link = {
    id: function (parent) { return parent.id; },
    description: function (parent) { return parent.description; },
    url: function (parent) { return parent.url; },
    postedBy: function (parent, args, context) {
        return context.prisma.link.findOne({ where: {
                id: parent.id
            } }).postedBy();
    },
    votes: function (parent, args, context) {
        return context.prisma.link.findOne({ where: { id: parent.id } }).votes();
    }
};
exports.default = Link;
