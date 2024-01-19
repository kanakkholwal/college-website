import mongoose, { Document, Schema } from 'mongoose';
export interface Content {
    title:string,
    topics:string[],
    lectures:number,
    
}
const contentSchema = new Schema<Content>({
    title:{
        type:String,
        trim:true,
        unique:true,
        required:true
    },
    topics:{
        type:[String],
        trim:true,
        required:true
    },
    lectures:Number,
})
export interface CourseType extends Document {
    name: string;
    code: string;
    type: string;
    credits:number,
    department:string,
    content:Content[],
    outcomes?:string[],
    books_and_references:{
        name:string,
        link:string,
    }[],
    prev_papers:{
        year:number,
        exam:"mid" | "end" | "others",
        url:string,
        name:string,
        preview?:string,
    }[],
    createdAt?: Date;
    updatedAt?: Date;
}


const courseSchema = new Schema<CourseType>({
    name: {
        type:String,
        trim:true,
        unique:true,
        required:true
    },
    code: {
        type:String,
        uppercase:true,
        trim:true,
        unique:true,
        required:true
    },
    type: {
        type:String,
        trim:true,
        required:true
    },
    credits:{
        type:Number,
        required:true
    },
    content: { type: [contentSchema], required: true },
    department: { type: String, required: true },
    prev_papers:{
        type:[{
            year:Number,
            exam:{
                type:String,
                enums:["mid" , "end" , "others"]
            },
            url:String,
            name:String,
            preview:String, 
        }],
        required:true,
    },
    outcomes:{
        type:[String],
        trim:true,
    },
    books_and_references:{
        type:[{
            name:String,
            link:String,
        }],
        required:true,
    },
    
},{
    timestamps:true
});

const Course = mongoose.models.Course ||mongoose.model<CourseType>('Course', courseSchema);

export default Course;
