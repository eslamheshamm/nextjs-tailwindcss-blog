import clsx from "clsx";

export function Bio({ className }) {
	return (
		<div className={clsx(`flex items-center`, className)}>
			<img
				className="flex-shrink-0 mb-0 mr-3 rounded-full w-14 h-14 object-cover"
				src="https://source.unsplash.com/random"
				alt="Profile"
			/>

			<p className="text-base leading-7">
				Written by <b className="font-semibold">Eslam</b>
			</p>
		</div>
	);
}
