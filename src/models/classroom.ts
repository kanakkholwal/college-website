import mongoose, { Document, Schema } from 'mongoose';

interface IClassroom extends Document {
    roomNumber: string;
    building: string;
    capacity: number;
}

const classroomSchema = new Schema<IClassroom>({
    roomNumber: String,
    building: String,
    capacity: Number,
});

const Classroom = mongoose.model<IClassroom>('Classroom', classroomSchema);

export default Classroom;
