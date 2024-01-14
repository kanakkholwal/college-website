import { NextRequest, NextResponse } from "next/server";
import { ScrapeResult } from 'src/controllers/scraper';
import dbConnect from "src/lib/dbConnect";
import Result from "src/models/result";

export async function POST(request: NextRequest & { params: { rollNo: string } }) {
    try {
        const time = new Date()
        const rollNo = request.params.rollNo;

        const result = await ScrapeResult(rollNo);
        await dbConnect();
        const resultData = await Result.findOne({ rollNo: rollNo });
        if (resultData) {
            if (result.semesters.length > resultData.semesters.length) {
                resultData.semesters = result.semesters;
                await resultData.save();
                console.log("Updated ", rollNo)
            } else {
                console.log("Up to date ", rollNo)

            }


        } else {
            await Result.create({
                name: result.name,
                rollNo: rollNo,
                branch: result.branch,
                batch: result.batch,
                programme: result.programme,
                semesters: result.semesters
            })
            console.log(" added ", rollNo)

        }

    
        return NextResponse.json({
            result: "success",
            message: "Result updated",
            rollNo: rollNo,
            createdAt: time,
            updatedAt: new Date(),
            data: result
        },{
            status:200
        })
    }
    catch (error:any) {
        return NextResponse.json({
            result: "fail",
            message: error.message,
        },{
            status:500
        })
    }


}
