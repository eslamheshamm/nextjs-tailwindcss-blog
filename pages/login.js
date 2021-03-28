import { useRouter } from "next/router";
const Login = () => {
	const router = useRouter();
	const onLogin = (e) => {
		e.preventDefault();
		router.push("./dashb");
	};
	return (
		<>
			<input type="text" placeholder="Your Name" />
			<input type="password" placeholder="Password" />
			<button onClick={onLogin} type="button">
				Login
			</button>
		</>
	);
};
export default Login;
