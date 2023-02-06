import Gradient from "@/components/Gradient";
import Swap from "@/components/Swap";

function Home() {
	return (
		<Gradient isBridge={false} isBorrow={false} isSwap={true} >
			<Swap />
		</Gradient>
	);
}

export default Home;
