import Footer from 'app/layouts/footer';
import Navbar from "app/layouts/navbar";
import Link from 'next/link';

const features = [
	{
		name: 'Check Results',
		description: `Explore your academic achievements effortlessly. View and celebrate your results with precision at your fingertips.`,
		icon: '/assets/results.png',
		href: '/results',
	},
	{
		name: 'Syllabus & Study Material',
		description: `Navigate through detailed course syllabi and download exclusive study materials tailored to your courses. Your academic roadmap is just a click away.`,
		icon: '/assets/syllabus.png',
		href: '/syllabus',
	},
	{
		name: 'Attendance Manager',
		description: `Effortlessly manage and track your attendance records. Log in to the Attendance Manager for a comprehensive view of your academic presence at NITH.`,
		icon: '/assets/attendance.png',
		href: '/attendance',
	},
	{
		name: 'Classroom Availability',
		description: `Effortlessly manage and track your attendance records. Log in to the Attendance Manager for a comprehensive view of your academic presence at NITH.`,
		icon: '/assets/classroom.png',
		href: '/classroom',
	},

]

export default function HomePage() {




	return (<>
		<header>
			<Navbar />
		</header>
		<main className="space-y-40 mb-40">
			<div className="relative" id="home">
				<div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
					<div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
					<div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
				</div>
				<div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
					<div className="relative pt-36 ml-auto">
						<div className="lg:w-3/4 text-center mx-auto">
							<h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">Empowering Education, <span className="relative bg-gradient-to-r from-primary to-violet-200 bg-clip-text text-transparent dark:from-primaryLight dark:to-secondaryLight md:px-2"> Transforming Futures.</span></h1>
							<p className="mt-8 text-gray-700 dark:text-gray-300 text-center mx-auto">
								Welcome back to <span className='font-bold'> {process.env.NEXT_PUBLIC_WEBSITE_NAME}</span>, Your academic journey continues here, where education meets inspiration and futures are continually transformed. Reconnect with the spirit of our community and explore the wealth of resources tailored just for you.

							</p>
							<div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
								<Link href="/login" className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max">
									<span className="relative text-base font-semibold text-white">Get started</span>
								</Link>
								<Link href="#features" className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max">
									<span className="relative text-base font-semibold text-primary dark:text-white">Learn more</span>
								</Link>
							</div>

						</div>
						<div className="mt-12  grid-cols-3 sm:grid-cols-4 md:grid-cols-6 hidden">
							<div className="p-4 grayscale transition duration-200 hover:grayscale-0">
								<img src="./images/clients/microsoft.svg" className="h-12 w-auto mx-auto" loading="lazy" alt="client logo" />
							</div>
							<div className="p-4 grayscale transition duration-200 hover:grayscale-0">
								<img src="./images/clients/airbnb.svg" className="h-12 w-auto mx-auto" loading="lazy" alt="client logo" />
							</div>
							<div className="p-4 flex grayscale transition duration-200 hover:grayscale-0">
								<img src="./images/clients/google.svg" className="h-9 w-auto m-auto" loading="lazy" alt="client logo" />
							</div>
							<div className="p-4 grayscale transition duration-200 hover:grayscale-0">
								<img src="./images/clients/ge.svg" className="h-12 w-auto mx-auto" loading="lazy" alt="client logo" />
							</div>
							<div className="p-4 flex grayscale transition duration-200 hover:grayscale-0">
								<img src="./images/clients/netflix.svg" className="h-8 w-auto m-auto" loading="lazy" alt="client logo" />
							</div>
							<div className="p-4 grayscale transition duration-200 hover:grayscale-0">
								<img src="./images/clients/google-cloud.svg" className="h-12 w-auto mx-auto" loading="lazy" alt="client logo" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="solutions">
				<div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
					<div className="md:w-2/3 lg:w-1/2">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-secondary">
							<path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
						</svg>
						<h2 className="my-8 text-2xl font-bold text-gray-700 dark:text-white md:text-4xl">
							Rediscover NITH with {process.env.NEXT_PUBLIC_WEBSITE_NAME}
						</h2>
						<p className="text-gray-600 dark:text-gray-300">
							Rediscover the familiar faces, iconic locations, and memorable moments that define life at <span className='font-bold'>NITH</span>. Our captivating image carousel celebrates the essence of your college experience.
						</p>
					</div>
					<div className="mt-16 grid divide-x divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-3xl border border-gray-100 text-gray-600 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
						{features.map((feature, index) => {
							return (<div key={index} className="group relative bg-white dark:bg-gray-800 dark:hover:bg-gray-700 transition hover:z-[1] hover:shadow-2xl hover:shadow-slate-600/10 hover:bg-slate-100 ">
								<div className="relative space-y-8 py-12 p-8">
									<img src={feature.icon} className="w-12" width={512} height={512} alt={feature.name} />
									<div className="space-y-2">
										<h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-primary/80">
											{feature.name}
										</h5>
										<p className="text-gray-600 dark:text-gray-300">
											{feature.description}
										</p>
									</div>
									<Link href={feature.href} className="flex items-center justify-between group-hover:text-primary">
										<span className="text-sm font-semibold">Read more</span>
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
											<path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
										</svg>
									</Link>
								</div>
							</div>)
						})}
					</div>
				</div>
			</div>
	

			<div className="relative py-16">
				<div aria-hidden="true" className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
					<div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
					<div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
				</div>
				<div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
					<div className="relative">
						{/* <div className="flex items-center justify-center -space-x-2">
							<img loading="lazy" width={400} height={400} src="./images/avatars/avatar.webp" alt="member photo" className="h-8 w-8 rounded-full object-cover" />
							<img loading="lazy" width={200} height={200} src="./images/avatars/avatar-2.webp" alt="member photo" className="h-12 w-12 rounded-full object-cover" />
							<img loading="lazy" width={200} height={200} src="./images/avatars/avatar-3.webp" alt="member photo" className="z-10 h-16 w-16 rounded-full object-cover" />
							<img loading="lazy" width={200} height={200} src="./images/avatars/avatar-4.webp" alt="member photo" className="relative h-12 w-12 rounded-full object-cover" />
							<img loading="lazy" width={200} height={200} src="./images/avatars/avatar-1.webp" alt="member photo" className="h-8 w-8 rounded-full object-cover" />
						</div> */}
						<div className="mt-6 m-auto space-y-6 md:w-8/12 lg:w-7/12">
							<h1 className="text-center text-4xl font-bold text-gray-800 dark:text-white md:text-5xl">
								Complaints & Feedback
							</h1>
							<p className="text-center text-xl text-gray-600 dark:text-gray-300">
							Your voice matters. Share your concerns and valuable feedback through our secure Complaints & Feedback section. We're committed to listening and enhancing your college experience based on your input
							</p>
							<div className="flex flex-wrap justify-center gap-6">
								<Link href="/login" className="relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max">
									<span className="relative text-base font-semibold text-white dark:text-dark">Get Started</span>
								</Link>
								<a href="/feedback" className="relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max">
									<span className="relative text-base font-semibold text-primary dark:text-white">
										Give Feedback
									</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>


		</main>

		<Footer />

	</>)
}