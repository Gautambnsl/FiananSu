import Gradient from "@/components/Gradient";
import Bridge from "@/components/Bridge";

function Home() {
	return (
		<Gradient isBridge={true} isBorrow={false} isSwap={false}>
			<Bridge />
		</Gradient>
	);
}

export default Home;
