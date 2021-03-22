import Link from "next/link";
import Head from "next/head";
import { BlogLayout, Bio } from "../components/common";
import { getSortedPosts } from "../utils/posts";
const Blog = ({ posts }) => {
	return (
		<BlogLayout>
			<Head>
				<title>Eslam Hesham</title>
				<link rel="icon" href="/star.ico" />
			</Head>
			<Bio className="my-14" />
			{posts.map(({ frontmatter: { title, description, date }, slug }) => (
				<article key={slug}>
					<header className="mb-2">
						<h3 className="mb-2">
							<Link href={"/blog/post/[slug]"} as={`/blog/post/${slug}`}>
								<a className="text-4xl font-bold text-yellow-600 font-display">
									{title}
								</a>
							</Link>
						</h3>
						<span className="text-sm">{date}</span>
					</header>
					<section>
						<p className="mb-8 text-lg">{description}</p>
					</section>
				</article>
			))}
		</BlogLayout>
	);
};
export default Blog;

export async function getStaticProps() {
	const posts = getSortedPosts();
	return {
		props: {
			posts,
		},
	};
}
