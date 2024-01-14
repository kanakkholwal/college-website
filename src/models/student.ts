import mongoose, { Document, Schema } from 'mongoose';

interface IStudent extends Document {
    firstName: string;
    lastName: string;
    rollNo: string;
    dateOfBirth: Date | null
    gender: string | null
    email: string;
    phone: string | null
    department: string;
}

const studentSchema = new Schema<IStudent>({
    firstName: String,
    lastName: String,
    rollNo: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date, default: null },
    gender: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, default: null},
    department: { type: String, required: true },
});

const Student = mongoose.model<IStudent>('Student', studentSchema);

export default Student;
