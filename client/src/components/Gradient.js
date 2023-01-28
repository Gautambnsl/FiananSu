import SideBar from "./SideBar";

function Gradient({ children }) {
	return (
		<div className="main">
			<SideBar isBridge={true} />

			<div className="main-content">
				<div className="background-gradient"></div>

				{children}
			</div>
		</div>
	);
}

export default Gradient;
