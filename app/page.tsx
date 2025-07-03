export const dynamic = 'force-dynamic';
import ArabicDate from "./components/ArabicDate";
import MovieType from "./components/MovieType";
import { formatRevenue, getImageUrl, getOldestRevenueUpdated, getRunTimeorEpisodes, getYear } from "./utils/utils";
import Link from "next/link";
import type { Movie , Prisma } from "@prisma/client";
import HomePageMovie from "./components/HomePageMovie";
import ActorCard from "./components/ActorCard";
import { uniqueBy } from "./utils/utils";

type MovieActorWithAll = Prisma.MovieActorGetPayload<{
	include: {
		Movie: true,
		Actor: true
	}
}>



async function Page() {

	const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

	const { movie } = await fetch(`${baseUrl}/api/lander`).then(res => res.json());
	const { LatestMovies } = await fetch(`${baseUrl}/api/latestmovies`).then(res => res.json());
	const { LatestTv } = await fetch(`${baseUrl}/api/latesttv`).then(res => res.json());
	const { highestRevenue } = await fetch(`${baseUrl}/api/greatestrevenue`).then(res => res.json());
	const { actors } = await fetch(`${baseUrl}/api/landingactors`).then(res => res.json());
	console.log(actors)


	return (
		<div className='text-9xl font-black mt-[118px]'>
			{/* Hero */}
			<section>
				<div className="h-[calc(100vh-110px)] w-screen flex justify-center">
					<div className="w-[81%] h-full rounded-4xl relative overflow-hidden px-10 py-7">

						{/* Background image */}
						<img
							src={
								movie.backdrop_path[0] === "/"
									? "https://image.tmdb.org/t/p/w1920" + movie.backdrop_path
									: movie.backdrop_path
							}
							className="absolute top-0 left-0 w-full h-full object-cover brightness-40"
							alt=""
						/>

						{/* Foreground content */}
						<div
							className="relative z-10 flex items-center justify-between gap-30 h-full flex-row-reverse">
							{/* Left Side */}
							<div className="flex flex-col gap-5 self-start h-full">
								{/* tags */}
								<div className="flex flex-row-reverse items-center justify-center gap-4">
									<h4 className="text-sm font-bold text-nowrap bg-secondary px-2 py-1 rounded-full empty:hidden"><ArabicDate dateString={movie.release_date} /></h4>
									<h4 className="text-sm font-bold text-nowrap bg-secondary px-2 py-1 rounded-full text-center empty:hidden">{getRunTimeorEpisodes(movie)}</h4>
									<h4 className="text-sm font-bold text-nowrap bg-secondary px-2 py-1 rounded-full text-center empty:hidden"><MovieType movietype={movie.type} /></h4>
								</div>
								{/* Poster Image */}
								<div
									className="h-full bg-cover bg-center rounded-2xl"
									style={{ backgroundImage: `url(${getImageUrl(movie.poster_path, true)})` }}>
								</div>
								{/* CTA button */}
								<Link href={`/movie/${movie.id}`} className="text-xl text-center text-text bg-primary hover:bg-primary-hover rounded-2xl py-5 cursor-pointer">
									عرفني اكتر
								</Link>
							</div>
							{/* Right Side */}
							<div className="flex flex-col justify-between h-full">
								<h1 className="text-text text-7xl font-semibold">الأحدث</h1>
								<div>
									<h1 className="text-text text-7xl mb-8">{movie.title}</h1>
									<p className="text-soft-text font-medium text-xl text-right mb-10">{movie.overview}</p>
								</div>
							</div>
						</div>

					</div>
				</div>
			</section>
			{/* Latest Movies */}
			<section className="h-fit my-40 w-screen">
				{/* Section Header */}
				<div className="w-[81%] mx-auto flex items-center justify-end flex-row-reverse gap-5">
					<button className="text-black text-xl font-semibold bg-secondary hover:bg-success rounded-xl cursor-pointer px-3 py-2">المزيد</button>
					<div>
						<h2 className="text-5xl text-text font-extrabold">أحدث الأفلام</h2>
						<h5 className="text-base text-muted-text font-normal">أجدد الأفلام اللي نزلت عندنا</h5>
					</div>
					<div className="w-3 h-20 bg-primary self-stretch"></div>
				</div>
				{/* Movies */}
				<div className="flex items-center justify-center gap-10 w-[81%] mx-auto mt-10">
					{
						LatestMovies.map((movie: Movie) => {
							return (
								<HomePageMovie movie={movie} key={movie.id} />
							)
						})
					}
				</div>
			</section>
			{/* Latest Shows */}
			<section className="h-fit my-15 w-screen">
				{/* Section Header */}
				<div className="w-[81%] mx-auto flex items-center justify-end flex-row-reverse gap-5">
					<button className="text-black text-xl font-semibold bg-secondary hover:bg-success rounded-xl cursor-pointer px-3 py-2">المزيد</button>
					<div>
						<h2 className="text-5xl text-text font-extrabold">أحدث المسلسلات</h2>
						<h5 className="text-base text-muted-text font-normal">مسلسلات جديدة نازلة دلوقتي... تابعها أول بأول</h5>
					</div>
					<div className="w-3 h-20 bg-primary self-stretch"></div>
				</div>
				{/* Shows */}
				<div className="flex items-center justify-center gap-10 w-[81%] mx-auto mt-10">
					{
						LatestTv.map((show: Movie) => {
							return (
								<HomePageMovie movie={show} key={show.id} />
							)
						})
					}
				</div>
			</section>
			<section className="h-fit my-15 w-screen">
				<div className="w-[81%] mx-auto flex items-center justify-end flex-row-reverse gap-5">
					<button className="text-black text-xl font-semibold bg-secondary hover:bg-success rounded-xl cursor-pointer px-3 py-2">المزيد</button>
					<div className="flex flex-col gap-1">
						<h5 className="text-base text-muted-text font-normal">
							اخر تحديث <ArabicDate dateString={getOldestRevenueUpdated(highestRevenue)} />

						</h5>
						<h2 className="text-5xl text-text font-extrabold my-3">أعلي ايرادات</h2>
						<h5 className="text-base text-muted-text font-normal">أكتر أفلام جابت فلوس في السينما</h5>
					</div>
					<div className="w-3 bg-primary self-stretch"></div>
				</div>
				<div className="flex w-[85%] mx-auto mt-10 items-center justify-center gap-10">
					{
						highestRevenue.map((movie: Movie, index: number) => {
							return (
								<div key={movie.id} className="flex items-center justify-center gap-5">
									<HomePageMovie movie={movie} />
									<div className="flex flex-col items-center justify-center font-number mx-auto">
										<h3 className="text-2xl text-text mb-10">{getYear(movie.release_date)}</h3>
										<h2 className="text-8xl text-secondary">#{index + 1}</h2>
										<h3 className="text-3xl text-success">{formatRevenue(movie.revenue)}</h3>
										<h4 className="text-2xl text-muted-text">EGP</h4>
									</div>
								</div>
							)
						})
					}
				</div>
			</section>
			{/* Actors */}
			<section>
				<div className="w-[81%] mx-auto flex items-center justify-end flex-row-reverse gap-5">
					<button className="text-black text-xl font-semibold bg-secondary hover:bg-success rounded-xl cursor-pointer px-3 py-2">المزيد</button>
					<div className="flex flex-col gap-1">
						<h2 className="text-5xl text-text font-extrabold my-3">أكتر وجوه ظهرت الفترة دي</h2>
						<h5 className="text-base text-muted-text font-normal">شوف الممثلين اللي الكل بيتابعهم حاليًا</h5>
					</div>
					<div className="w-3 bg-primary self-stretch"></div>
				</div>
				<div className="flex items-start justify-center gap-10 w-[81%] mx-auto mt-10 mb-60">
					{
						uniqueBy<MovieActorWithAll>(actors, 'Actor').slice(0 , 6).map((movieactor: MovieActorWithAll) => {

							return (
								<ActorCard actor={movieactor.Actor} key={movieactor.Actor.id} />
							)
						})
					}
				</div>
			</section>
		</div>
	)
}

export default Page