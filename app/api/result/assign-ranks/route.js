import { NextRequest, NextResponse } from "next/server";
import dbConnect from "src/lib/dbConnect";
import ResultModel from "src/models/result";

export async function POST(request) {
    try {

        if (process.env.NODE_ENV === 'production') {
            const secret = request.headers.get("authorization");
            if (secret !== process.env.SECRET_KEY) {
                return NextResponse.json({
                    result: "fail",
                    message: "Unauthorized",
                },{
                    status:401
                })
            }
        }


        await dbConnect();
        const time = new Date();
            try {
                const aggregationPipeline = [
                    {
                        $addFields: {
                            lastSemester: {
                                $arrayElemAt: ["$semesters", -1],
                            },
                        },
                    },
                    {
                        $sort: {
                            "lastSemester.cgpi": -1,
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            results: {
                                $push: "$$ROOT",
                            },
                        },
                    },
                    {
                        $unwind: "$results",
                    },
                    {
                        $project: {
                            _id: "$results._id",
                            rank: "$results.rank",
                        },
                    },
                ];
        
                const resultsWithRanks = await ResultModel.aggregate(aggregationPipeline);
        
                await Promise.all(
                    resultsWithRanks.map(async (result) => {
                        const { _id, rank } = result;
                        await ResultModel.findByIdAndUpdate(_id, { rank });
                    })
                );
        
                // Update the documents with the calculated ranks
                await Promise.all(
                    resultsWithRanks.map(async (result) => {
                        const { _id, rank } = result;
                        await ResultModel.findByIdAndUpdate(_id, { rank });
                    })
                );
        
                console.log('Ranks assigned successfully.');
            } catch (error) {
                console.error('Error assigning ranks:', error);

            }

        
        console.log('Ranks assigned successfully.');
        const time2 = new Date();

        // time passed in seconds
        const timePassed = (time2.getTime() - time.getTime()) / 1000;


    

    
        return NextResponse.json({
            result: "success",
            message: "Ranks assigned in " + timePassed + " seconds",
            lastUpdated: time2,
        },{
            status:200
        })
    }
    catch (error) {
        console.error('Error assigning ranks:', error);

        return NextResponse.json({
            result: "fail",
            message: error.message,
        },{
            status:500
        })
    }


}


