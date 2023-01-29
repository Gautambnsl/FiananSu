import Nav from "./Nav";

function Layout({ children }) {
	return (
		<>
			<Nav />

			<main>{children}</main>
		</>
	);
}

export default Layout;
