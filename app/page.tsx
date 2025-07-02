import Navbar from "./components/Navbar";
import ArabicDate from "./components/ArabicDate";
import MovieType from "./components/MovieType";
import { getImageUrl, getRunTimeorEpisodes } from "./utils/utils";
import Link from "next/link";
import type { Movie } from "@prisma/client";
import HomePageMovie from "./components/HomePageMovie";

async function Page() {

	const { movie } = await fetch("http://localhost:3000/api/lander").then(res => res.json());
	const { LatestMovies } = await fetch("http://localhost:3000/api/latestmovies").then(res => res.json());
	console.log(LatestMovies)


	return (
		<div className='text-9xl font-black'>
			<Navbar />
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
									style={{ backgroundImage: `url(${getImageUrl(movie.poster_path , true)})` }}>
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
			<section className="h-fit my-15 w-screen">
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
								<HomePageMovie movie={movie} key={movie.id}/>
							)
						})
					}
				</div>
			</section>
			<section className="h-fit my-15 w-screen">
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
								<HomePageMovie movie={movie} key={movie.id}/>
							)
						})
					}
				</div>
			</section>

		</div>
	)
}

export default Page