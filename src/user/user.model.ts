import mongoose, { Document, Model, Schema } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  hashValue: string;
  isAccountLocked: boolean;
  isAccountVerified: boolean;
  isAccountDeactivated: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<UserDocument> = new Schema<UserDocument>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    hashValue: {
      type: String,
      required: true,
    },
    isAccountLocked: {
      type: Boolean,
      default: false,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    isAccountDeactivated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);
