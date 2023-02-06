import SideBar from "./SideBar";

function Gradient({ children, isBridge, isBorrow, isSwap }) {
	return (
		<div className="main">
			<SideBar isBridge={isBridge} isBorrow={isBorrow} isSwap={isSwap} />

			<div className="main-content">
				<div className="background-gradient"></div>

				{children}
			</div>
		</div>
	);
}

export default Gradient;
