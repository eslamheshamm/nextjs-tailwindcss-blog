import Link from "next/link";
import ReactMarkdown from "react-markdown/with-html";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import style from "react-syntax-highlighter/dist/cjs/styles/prism/dracula";
import Head from "next/head";
import { BlogLayout, Bio } from "../../../components/common";
import { getPostBySlug, getPostsSlugs } from "../../../utils/posts";

export default function Post({ post, frontmatter, nextPost, previousPost }) {
	return (
		<BlogLayout>
			<Head>
				<title> {frontmatter.title}</title>
			</Head>
			<article>
				<header className="mb-8">
					<h1 className="mb-2 text-6xl font-black leading-none font-display">
						{frontmatter.title}
					</h1>
					<p className="text-sm">{frontmatter.date}</p>
				</header>
				<ReactMarkdown
					className="mb-4 prose lg:prose-lg dark:prose-dark"
					escapeHtml={false}
					source={post.content}
					renderers={{ code: CodeBlock }}
				/>
				<hr className="mt-4" />
				<footer>
					<Bio className="mt-8 mb-16" />
				</footer>
			</article>

			<nav className="flex flex-wrap justify-between mb-10">
				{previousPost ? (
					<Link
						href={"/blog/post/[slug]"}
						as={`/blog/post/${previousPost.slug}`}
					>
						<a className="text-lg font-bold">
							← {previousPost.frontmatter.title}
						</a>
					</Link>
				) : (
					<div />
				)}
				{nextPost ? (
					<Link href={"/blog/post/[slug]"} as={`/blog/post/${nextPost.slug}`}>
						<a className="text-lg font-bold">{nextPost.frontmatter.title} →</a>
					</Link>
				) : (
					<div />
				)}
			</nav>
		</BlogLayout>
	);
}

export async function getStaticPaths() {
	const paths = getPostsSlugs();

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params: { slug } }) {
	const postData = getPostBySlug(slug);

	if (!postData.previousPost) {
		postData.previousPost = null;
	}

	if (!postData.nextPost) {
		postData.nextPost = null;
	}

	return { props: postData };
}

const CodeBlock = ({ language, value }) => {
	return (
		<SyntaxHighlighter style={style} language={language}>
			{value}
		</SyntaxHighlighter>
	);
};
