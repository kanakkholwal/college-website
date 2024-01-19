import { NextRequest, NextResponse } from "next/server";
import dbConnect from "src/lib/dbConnect";
import UserModel from "src/models/user";


export async function POST(request: NextRequest) {
    try {

        if (process.env.NODE_ENV === 'production') {
            const secret = request.headers.get("authorization");
            if (secret !== process.env.SECRET_KEY) {
                return NextResponse.json({
                    result: "fail",
                    message: "Unauthorized",
                }, {
                    status: 401
                })
            }
        }
        const  user = await request.json();
        console.log(user);


        await dbConnect();
        const newUser = new UserModel(user);
        await newUser.save();
        return NextResponse.json({
            result: "success",
            data: newUser

        }, {
            status: 200
        })
    }
    catch (error: any) {

        return NextResponse.json({
            result: "fail",
            message: error.message,
        }, {
            status: 500
        })
    }


}


