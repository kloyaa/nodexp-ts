"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityType = exports.Activity = void 0;
var Activity;
(function (Activity) {
    Activity["LOGIN"] = "login-activity";
    Activity["ACCOUNT_CREATION"] = "register-activity";
    Activity["LOGOUT"] = "logout-activity";
})(Activity = exports.Activity || (exports.Activity = {}));
var ActivityType;
(function (ActivityType) {
    ActivityType["LOGIN"] = "LOGIN";
    ActivityType["LOGOUT"] = "LOGOUT";
    ActivityType["ACCOUNT_CREATION"] = "ACCOUNT_CREATION";
    ActivityType["WITHDRAWAL_CREATION"] = "WITHDRAWAL_CREATION";
    ActivityType["DEPOSIT_CREATION"] = "DEPOSIT_CREATION";
    ActivityType["ORDER_PLACEMENT"] = "ORDER_PLACEMENT";
    ActivityType["ORDER_CANCELLATION"] = "ORDER_CANCELLATION";
    ActivityType["ACCOUNT_WALLET_CHANGES"] = "ACCOUNT_WALLET_CHANGES";
    ActivityType["ACCOUNT_SETTING_CHANGES"] = "ACCOUNT_SETTING_CHANGES";
    ActivityType["ACCOUNT_PROFILE_CHANGES"] = "ACCOUNT_PROFILE_CHANGES";
    ActivityType["SYSTEM_ERROR"] = "SYSTEM_ERROR";
    ActivityType["API_REQUEST"] = "API_REQUEST";
    ActivityType["SECURITY_EVENT"] = "SECURITY_EVENT";
    ActivityType["ADMIN_ACTION"] = "ADMIN_ACTION";
    ActivityType["EMAIL_NOTIFICATION"] = "EMAIL_NOTIFICATION";
    ActivityType["SMS_NOTIFICATTION"] = "SMS_NOTIFICATTION";
})(ActivityType = exports.ActivityType || (exports.ActivityType = {}));
//# sourceMappingURL=types.event.js.map