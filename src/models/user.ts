import bcrypt from 'bcryptjs';
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
    firstName: string;
    lastName: string;
    rollNo: string;
    email: string;
    profilePicture: string | null,
    gender: string | null
    phone: string | null
    department: string;
    roles: string[];
}
export interface IUserSchema extends IUser, Document {
    password: string;
    comparePassword: (password: string) => Promise<boolean>;
}
const userSchema = new Schema<IUserSchema>({
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    rollNo: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true},
    gender: { type: String, default: null },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Your password must be at least 6 characters long"],
        select: false, // Don't send back password after request
    },
    profilePicture: { type: String, default: null },
    phone: { type: Number, default: null },
    department: { type: String, required: true },
    roles: { type: [String], default: ['student'], enum: ['student', 'cr', 'faculty', 'hod',"moderator","admin"] }
});
// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const saltRounds = 10;
    try {
        const hash = await bcrypt.hash(this.password, saltRounds);
        this.password = hash;
        next();
    } catch (err:any) {
        return next(err);
    }
});
// Method to compare password
userSchema.methods.comparePassword = async function (password:string):Promise<boolean> {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (err:any) {
      throw new Error(err);
    }
  };
  

const User = mongoose.models.User ||  mongoose.model<IUserSchema>('User', userSchema);

export default User;
