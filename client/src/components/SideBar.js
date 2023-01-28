import Link from "next/link";

import Bridge from "../assests/bridge.svg";
import Swap from "../assests/swap.svg";

function SideBar({ isBridge }) {
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
					<Link href="/swap" className={`${!isBridge ? "active" : ""}`}>
						<img src={Swap.src} />
						Swap
					</Link>
				</li>
			</ul>
		</div>
	);
}

export default SideBar;
