
import { NextRequest, NextResponse } from "next/server";
// import { getMetData } from "./fetch";

export async function GET(request: NextRequest) {
    try {
        const requestUrl = request.nextUrl.searchParams.get('url') as string;
        if (!requestUrl) {
            return NextResponse.json({
                result: "fail",
                message: "",
                data: null
            }, {
                status: 400
            })
        }
        // const metadata = await getMetData(requestUrl);



        return NextResponse.json({
            result: "success",
            message: "Fetched MetaData",
            data: requestUrl
        }, {
            status: 200
        })
    }
    catch (error: any) {
        return NextResponse.json({
            result: "fail",
            message: error.message,
            data: null
        }, {
            status: 500
        })
    }


}
