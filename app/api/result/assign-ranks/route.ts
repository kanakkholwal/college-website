import { NextRequest, NextResponse } from "next/server";
import dbConnect from "src/lib/dbConnect";
import ResultModel from "src/models/result";

export async function POST(request: NextRequest) {
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
        const assignRanksWithAggregation = async () => {
            try {
                // Aggregate to calculate ranks
                const aggregationPipeline = [
                    {
                        $unwind: "$semesters",
                    },
                    {
                        $sort: {
                            "semesters.cgpi": -1,
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
                        $group: {
                            _id: "$results._id",
                            rank: {
                                $first: "$results.rank",
                            },
                            collegeRank: {
                                $first: "$results.rank.college",
                            },
                            batchRank: {
                                $first: "$results.rank.batch",
                            },
                            branchRank: {
                                $first: "$results.rank.branch",
                            },
                            classRank: {
                                $first: "$results.rank.class",
                            },
                            data: {
                                $first: "$results",
                            },
                        },
                    },
                    {
                        $sort: {
                            "data.semesters.cgpi": 1,
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
                            rank: "$results.rank",
                        },
                    },
                ];
        
                // Execute the aggregation
                const resultsWithRanks = await ResultModel.aggregate(aggregationPipeline);
        
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
        };
        
        // Call the function to assign ranks using aggregation
        assignRanksWithAggregation();
        
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
    catch (error:any) {
        console.error('Error assigning ranks:', error);

        return NextResponse.json({
            result: "fail",
            message: error.message,
        },{
            status:500
        })
    }


}


