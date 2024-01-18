"use server";
import dbConnect from "src/lib/dbConnect";
import ResultModel from "src/models/result";

export async function getResults(query: string, currentPage: number) {
    await dbConnect();

    const resultsPerPage = 32;
    const skip = currentPage * resultsPerPage - resultsPerPage;
    const results = await ResultModel.find({
        $or: [
            { "rollNo": { $regex: query, $options: "i" } },
            { "name": { $regex: query, $options: "i" } },
        ],
    })
        .sort({
            "rank.college": "asc",
        })
        .skip(skip)
        .limit(resultsPerPage)
        .exec();
        const totalPages = Math.ceil((await ResultModel.countDocuments({
            $or: [
                { "rollNo": { $regex: query, $options: "i" } },
                { "name": { $regex: query, $options: "i" } },
            ],
        })) / resultsPerPage);
    return { results, totalPages };
}