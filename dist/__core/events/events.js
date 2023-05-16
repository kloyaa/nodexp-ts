"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emitter_event_1 = require("./emitter.event");
const activity_model_1 = require("../../activity/activity.model");
emitter_event_1.emitter.on('login-activity', (payload) => {
    new activity_model_1.LogActivityModel({
        user: payload.userId,
        editor: payload.userId,
        activity: payload.activity,
        device: payload.device
    }).save();
});
emitter_event_1.emitter.on('register-activity', (payload) => {
    new activity_model_1.LogActivityModel({
        user: payload.userId,
        editor: payload.userId,
        activity: payload.activity,
        device: payload.device
    }).save();
});
//# sourceMappingURL=events.js.map