
import { authOptions } from "app/api/auth/[...nextauth]/options";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { UserAuthForm } from './login-form';


export const metadata: Metadata = {
    title: "Login | NITH PORTAL",
    description: "Login to an account on " + process.env.NEXT_PUBLIC_APP_NAME,
    keywords: "register, account, " + process.env.NEXT_PUBLIC_APP_NAME,
}


export default async function Page() {
    const session = await getServerSession(authOptions);
    console.log(session)
    if (session) return redirect("/dashboard")

    return (
        <main className="min-h-screen w-full flex flex-col justify-center items-center " style={{
            backgroundImage: 'url("/assets/login-bg.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }} 
        >



<div className='rounded-3xl bg-slate-100 dark:bg-slate-800 flex justify-around items-center shadow-lg '  data-aos="fade-left">

                <div className='w-full lg:w-[540px]'>
                    <div className='py-8 px-8 pb-16'>
                        <div className='text-center'>
                            <Link href='/' className="text-center uppercase font-bold tracking-wider text-4xl text-slate-800 dark:text-slate-200">
                            NITH PORTAL
                            </Link>
                            <h2 className='font-bold text-lg mt-5'>
                                Welcome back, Login.
                            </h2>
                            <p className='text-sm text-slate-600 dark:text-slate-300 mb-8'>
                                Login to your account to access your dashboard
                            </p>
                            <UserAuthForm  data-aos="fade-up" />
                        </div>


                    </div>
                </div>
            </div>

        </main>
    )
}
