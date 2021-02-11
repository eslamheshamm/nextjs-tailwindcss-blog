import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useTheme } from "next-themes";
import cn from "classnames";
import Link from "next/link";

export function BlogLayout({ children }) {
	return (
		<div className="w-full min-h-screen dark:bg-gray-600 dark:text-white">
			<div className="max-w-screen-sm px-4 py-12 mx-auto antialiased font-body">
				<Header />
				<main>{children}</main>
				<div className="flex justify-end">
					<Link href="/">
						<a
							href="/"
							className="text-black dark:text-white font-display no-underline text-lg font-black"
						>
							← Back To home
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
}

const Header = () => {
	const { setTheme, resolvedTheme } = useTheme();
	const { pathname } = useRouter();
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);
	const toggleDarkMode = (checked) => {
		const isDarkMode = checked;
		if (isDarkMode) setTheme("dark");
		else setTheme("light");
	};

	const isRoot = pathname === "/blog";
	const isDarkMode = resolvedTheme === "dark";
	return (
		<header
			className={cn("flex items-center justify-between ", {
				"mb-8": isRoot,
				"mb-2": !isRoot,
			})}
		>
			<div className="max-w-md">{isRoot ? <Title big /> : <Title />}</div>
			{mounted && (
				<DarkModeSwitch
					checked={isDarkMode}
					onChange={toggleDarkMode}
					className={isRoot ? 28 : 24}
				/>
			)}
		</header>
	);
};

const Title = ({ big }) => (
	<h1>
		<Link href="/blog/">
			<a
				className={cn(
					"text-black dark:text-white font-display no-underline font-black",
					big ? "text-3xl leading-none  sm:text-5xl " : "text-2xl"
				)}
			>
				Personal Blog
			</a>
		</Link>
	</h1>
);
