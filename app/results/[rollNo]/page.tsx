
import dbConnect from "src/lib/dbConnect";
import ResultModel from "src/models/result";


export default async function ResultsPage({ params }: { params: { rollNo: string } }) {
    await dbConnect();
    const result = await ResultModel.findOne({
        rollNo: params.rollNo
    });
    console.log(result);


    return (<>
        <div className="relative" id="home">
            <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
                <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
                <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
            </div>
            <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
                <div className="relative pt-36 ml-auto">
                    <div className="lg:w-3/4 text-center mx-auto">
                        <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">
                            <span className="relative bg-gradient-to-r from-primary to-violet-200 bg-clip-text text-transparent dark:from-primaryLight dark:to-secondaryLight md:px-2">
                                {result.name}
                            </span></h1>
                        <h5 className="mt-8 text-xl font-semibold text-gray-700 dark:text-gray-300 text-center mx-auto">
                            {result.rollNo}
                        </h5>
                        <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">

                        </div>

                    </div>

                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        </div>
    </>)
}
