import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  firstName: string,
  lastName?: string
  email: string;
  password: string;
  role: string;
  address: string;
  mobileNumber: string;
  googleId?: string
  refreshToken?: string;
  tokenExpiry?: Date;
  // comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema(
  { 
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { 
      type: String, 
      required: true 
    },
    role: { 
      type: String, 
      default: "customer" 
    },
    address: { 
      type: String 
    },
    mobileNumber: { 
      type: String 
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true
    },
    refreshToken: String,
    tokenExpiry: Date,
    // comparePassword: (password) => Promise
  },
  { timestamps: true }
);


UserSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

UserSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
