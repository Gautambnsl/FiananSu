function Error() {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "calc(100vh - 6rem)",
				fontWeight: "500",
				fontSize: "1.2rem",
				color: "#e84545",
				backgroundColor: "rgba(255, 255, 255, 0.05)",
				position: "relative",
				overflow: "hidden",
				textAlign: "center",
			}}
		>
			<div
				style={{
					backgroundImage: "linear-gradient(91deg, #f3ccff, #ffffd0)",
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					filter: "blur(10rem)",
					opacity: "0.7",
					zIndex: "-1",
					position: "absolute",
					height: "100%",
					width: "100%",
				}}
			></div>
			404 | This page could not be found
		</div>
	);
}

export default Error;
