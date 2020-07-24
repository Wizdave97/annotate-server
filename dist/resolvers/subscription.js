"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscription = {
    newLink: {
        subscribe: function (parent, args, context, info) {
            return context.pubsub.asyncIterator("NEW_LINK");
        },
        resolve: function (payload) { return payload; }
    },
    newVote: {
        subscribe: function (parent, args, context) {
            return context.pubsub.asyncIterator("NEW_VOTE");
        },
        resolve: function (payload) { return payload; }
    }
};
exports.default = Subscription;
