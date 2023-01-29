import SideBar from "./SideBar";

function Gradient({ children, isBridge }) {
	return (
		<div className="main">
			<SideBar isBridge={isBridge} />

			<div className="main-content">
				<div className="background-gradient"></div>

				{children}
			</div>
		</div>
	);
}

export default Gradient;
