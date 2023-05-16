import { emitter } from "./emitter.event";
import { LogActivityModel } from '../../activity/activity.model';

emitter.on('login-activity', (payload: any) => {
    new LogActivityModel({  
        user: payload.userId, 
        editor: payload.userId, 
        activity: payload.activity,
        device: payload.device
    }).save();
});
