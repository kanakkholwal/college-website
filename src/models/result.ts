import mongoose, { Document, Schema } from 'mongoose';

export interface Course {
    name: string;
    code: string;
    cgpi: number;
}

export interface Semester {
    sgpi: number;
    cgpi: number;
    courses: Course[];
    semester: number;
    sgpi_total: number;
    cgpi_total: number;
}

export interface ResultType extends Document {
    name: string;
    rollNo: string;
    branch: string;
    batch: number;
    programme: string;
    semesters: Semester[];
    createdAt?: Date;
    updatedAt?: Date;
}

const CourseSchema: Schema = new Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    cgpi: { type: Number, required: true },
});

const SemesterSchema: Schema = new Schema({
    sgpi: { type: Number, required: true },
    cgpi: { type: Number, required: true },
    courses: { type: [CourseSchema], required: true },
    semester: { type: Number, required: true },
    sgpi_total: { type: Number, required: true },
    cgpi_total: { type: Number, required: true },
});

const ResultSchema: Schema = new Schema({
    name: { type: String, required: true },
    rollNo: { type: String, required: true,unique: true },
    branch: { type: String, required: true },
    batch: { type: Number, required: true },
    programme: { type: String, required: true },
    semesters: { type: [SemesterSchema], required: true },
},{
    timestamps: true
});

const ResultModel = mongoose.model<ResultType>('Result', ResultSchema);

export default ResultModel;
