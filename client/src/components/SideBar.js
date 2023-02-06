import Link from "next/link";

import Bridge from "../assests/bridge.svg";
import Swap from "../assests/swap.svg";
import Borrow from "../assests/borrow2.png";

function SideBar({ isBridge, isBorrow, isSwap }) {
	return (
		<div className="sideBar">
			<ul>
				<li>
					<Link href="/" className={`${isBridge ? "active" : ""}`}>
						<img src={Bridge.src} />
						Bridge
					</Link>
				</li>

				<li>
					<Link href="/swap" className={`${isSwap ? "active" : ""}`}>
						<img src={Swap.src} />
						Swap
					</Link>
				</li>
				<li>
					<Link href="/borrow" className={`${isBorrow ? "active" : ""}`}>
						{/* <img src={Borrow.src}  /> */}
						🪙 Borrow
					</Link>
				</li>
			</ul>
		</div>
	);
}

export default SideBar;
