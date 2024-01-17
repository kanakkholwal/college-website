import { NextRequest, NextResponse } from "next/server";
import { ScrapeResult } from 'src/controllers/scraper';
// import dbConnect from "src/lib/dbConnect";
// import Result from "src/models/result";

export async function POST(request: NextRequest) {
    try {
        const time = new Date()
        const rollNo = request.nextUrl.searchParams.get('rollNo') as string;
        console.log(rollNo)

        const result = await ScrapeResult(rollNo);

        // await dbConnect();
        // const resultData = await Result.findOne({ rollNo: rollNo });
        // if (resultData) {
        //     resultData.name = result.name;
        //     resultData.branch = result.branch;
        //     resultData.batch = result.batch;
        //     resultData.programme = result.programme;
        //     resultData.semesters = result.semesters;
        //     await resultData.save();
        // }

    
        return NextResponse.json({
            result: "success",
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
