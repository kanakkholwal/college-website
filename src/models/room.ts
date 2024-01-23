import mongoose, { Document, Schema } from 'mongoose';



export interface RoomType {
    roomNumber: string;
    roomType: string;
    currentStatus: string;
    lastUpdatedBy: mongoose.Schema.Types.ObjectId; // Reference to User model
    lastUpdatedTime: Date;
    capacity?: number;
    usageHistory: mongoose.Schema.Types.ObjectId[]; // Reference to History model
}
export interface RoomTypeWithId extends RoomType {
    _id: mongoose.Schema.Types.ObjectId | string;
}
interface IRoom extends Document , RoomType {} 

const RoomSchema: Schema = new Schema({
    roomNumber: { type: String, required: true, unique: true },
    roomType: { type: String, required: true,enum: ['classroom', 'conference', 'office', 'lab'] },
    currentStatus: { type: String, enum: ['available', 'occupied'], default: 'available' },
    lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
    lastUpdatedTime: { type: Date, default: Date.now },
    capacity: { type: Number },
    usageHistory: { type: [mongoose.Schema.Types.ObjectId], ref: 'History' }, // Reference to History model
});

const RoomModel = mongoose.models.Room || mongoose.model<IRoom>('Room', RoomSchema);

export default RoomModel;
