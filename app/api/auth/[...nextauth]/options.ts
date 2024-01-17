import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "src/lib/dbConnect";
import UserModel from "src/models/user";
import { sessionUserType } from "src/types/session";

import { determineDepartment } from "src/controllers/scraper";
interface AuthEnv {
    GOOGLE_ID: string;
    GOOGLE_SECRET: string;
    NEXT_AUTH_SECRET: string;
    NEXTAUTH_URL: string;
}



// Read environment variables
const env: AuthEnv = {
    GOOGLE_ID: process.env.GOOGLE_ID || "",
    GOOGLE_SECRET: process.env.GOOGLE_SECRET || "",
    NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET || "",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "",
};

// Check if all required environment variables are defined
Object.values(env).forEach((value) => {
    if (!value) {
        throw new Error(`Environment variable ${value} is not defined`);
    }
});
const useSecureCookies = env.NEXTAUTH_URL.startsWith('https://')
const cookiePrefix = useSecureCookies ? '__Secure-' : ''
const hostName = new URL(env.NEXTAUTH_URL).hostname;

export const authOptions: NextAuthOptions = {
    // Enable JSON Web Tokens since we will not store sessions in our DB
    session: {
        strategy: "jwt",
    },
    secret: env.NEXT_AUTH_SECRET,
    // Here we add our login providers - this is where you could add Google or Github SSO as well
    providers: [
        CredentialsProvider({
            name: "credentials",
            // The credentials object is what's used to generate Next Auth default login page - We will not use it however.
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            // Authorize callback is ran upon calling the sign-in function
            authorize: async (credentials) => {
                return new Promise(async (resolve, reject) => {
                    if (!credentials || !credentials.email || !credentials.password) {
                        return reject({
                            status: 401,
                            message: "Credentials not provided",
                            success: false
                        })
                    }
                    try {
                        await dbConnect();
                        const userInDb = await UserModel.findOne({ email: credentials.email }).select('+password')

                        if (!userInDb)
                            return reject({
                                status: 401,
                                message: "User not found",
                                success: false
                            })
                        const pwValid = await userInDb.comparePassword(credentials.password);

                        if (!pwValid)
                            return reject({
                                status: 401,
                                message: "Wrong Password",
                                success: false
                            })
                        const user = {
                            id: userInDb._id.toString(),
                            _id: userInDb._id.toString(),
                            firstName: userInDb.firstName,
                            lastName: userInDb.lastName,
                            rollNo: userInDb.rollNo,
                            gender: userInDb.gender,
                            email: userInDb.email,
                            roles: userInDb.roles,
                            profilePicture: userInDb.profilePicture,
                            phone: userInDb.phone,
                            department: userInDb.department,

                        } satisfies sessionUserType


                        console.log("user found", user)

                        return resolve(user)

                    }
                    catch (err) {

                        console.log(err)
                        return reject(err)
                    }
                })

            }
        }),
        GoogleProvider({
            clientId: env.GOOGLE_ID || "",
            clientSecret: env.GOOGLE_SECRET || "",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            },
            async profile(profile) {
                try {
                    console.log(profile);
                    if (profile.email.split("@")[1] !== "nith.ac.in") {
                        return Promise.reject({
                            status: 401,
                            message: "Only NITH emails are allowed",
                            success: false
                        })
                    }
                    await dbConnect();
                    const userInDb = await UserModel.findOne({ email: profile.email })
                    if (!userInDb) {
                        console.log("user not found, creating new user", profile)
                        const user = new UserModel({
                            email: profile.email,
                            firstName: profile.given_name ? profile.given_name : profile.name.split(" ")[0],
                            lastName: profile.family_name ? profile.family_name : profile.name.split(" ")[1],
                            username: profile.email.split("@")[0],
                            profilePicture: profile.picture,
                            password: "google" + profile.sub,
                            roles: ["student"],
                            gender: null,
                            phone: null,
                            department: determineDepartment(profile.email.split("@")[0]),

                        });
                        await user.save();

                        return Promise.resolve({
                            _id: user._id.toString(),
                            id: user._id.toString(),
                            firstName: user.firstName,
                            lastName: user.lastName,
                            rollNo: user.rollNo,
                            gender: user.gender,
                            email: user.email,
                            roles: user.roles,
                            profilePicture: user.profilePicture,
                            phone: user.phone,
                            department: user.department,
                        });
                    }
                    console.log("user found", userInDb)



                    return Promise.resolve({
                        _id: userInDb._id.toString(),
                        id: userInDb._id.toString(),
                        firstName: userInDb.firstName,
                        lastName: userInDb.lastName,
                        rollNo: userInDb.rollNo,
                        gender: userInDb.gender,
                        email: userInDb.email,
                        roles: userInDb.roles,
                        profilePicture: userInDb.profilePicture,
                        phone: userInDb.phone,
                        department: userInDb.department,
                    } satisfies sessionUserType)
                }
                catch (err) {
                    console.log(err);
                    return Promise.reject("/login?error=google_error")
                }


            },
        })

    ],
    // All of this is just to add user information to be accessible for our app in the token/session
    callbacks: {
        // We can pass in additional information from the user document MongoDB returns
        // This could be avatars, role, display name, etc...
        async jwt({ token, user }: {
            token: any,
            user: any
        }): Promise<any> {
            if (user) {
                token.user = {
                    _id: user._id.toString(),
                    firstName: user.firstName,
                    lastName: user.lastName,
                    rollNo: user.rollNo,
                    gender: user.gender,
                    email: user.email,
                    roles: user.roles,
                    profilePicture: user.profilePicture,
                    phone: user.phone,
                    department: user.department,
                }
            }
            return token
        },
        // If we want to access our extra user info from sessions we have to pass it the token here to get them in sync:
        session: async ({ session, token }: {
            session: any,
            token: any
        }) => {
            if (token) {
                session.user = token.user
            }
            return session
        }
    },

    pages: {
        // Here you can define your own custom pages for login, recover password, etc.
        signIn: '/login', // Displays sign in buttons
        // newUser: '/signup'
        // signOut: '/auth/sign out',
        // error: '/auth/error',
        // verifyRequest: '/auth/verify-request',
    },
}



