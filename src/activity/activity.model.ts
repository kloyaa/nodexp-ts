import mongoose, { Document, Schema } from 'mongoose';

export interface LogActivityDocument extends Document {
  user: mongoose.Schema.Types.ObjectId;
  editor: mongoose.Schema.Types.ObjectId;
  activity: mongoose.Schema.Types.Mixed;
  device: mongoose.Schema.Types.Mixed;
}

const LogActivitySchema: Schema<LogActivityDocument> =
  new Schema<LogActivityDocument>(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      editor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      activity: {
        type: Object,
        required: true,
      },
      device: {
        type: Object,
        required: true,
      },
    },
    { timestamps: true },
  );

export const LogActivityModel = mongoose.model<LogActivityDocument>(
  'LogActivity',
  LogActivitySchema,
);
