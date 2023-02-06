import Gradient from "@/components/Gradient";
import Borrow from "@/components/Borrow";

function Home() {
	return (
		<Gradient isBridge={false} isBorrow={true} isSwap={false}>
			<Borrow />
		</Gradient>
	);
}

export default Home;
