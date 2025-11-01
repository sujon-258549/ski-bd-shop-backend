import mongoose, { Schema } from 'mongoose';
import { TUser, UserModel } from './User.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const UserSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      //   select: 0,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    role: {
      type: String,
      enum: ['admin'],
      default: 'admin',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    passwordChangeAt: {
      type: String,
    },
    
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

UserSchema.pre('save', async function name(next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.BCRYPC_HAS));
  next();
});
UserSchema.post('save', function (doc, next) {
  doc.password = '';
  console.log(this, 'Student Create is Success');
  next();
});

UserSchema.statics.isUserExistsById = async function (email: string) {
  const id = await User.findOne({ email }); //.select('+password');
  return id?._id;
};

UserSchema.statics.isPasswordMatch = async function (password, hasPassword) {
  return await bcrypt.compare(password, hasPassword);
};

// Create the User model
export const User = mongoose.model<TUser, UserModel>('User', UserSchema);
