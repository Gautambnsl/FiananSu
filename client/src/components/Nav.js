import Logo from "../assests/logo.png";
import Disconnect from "../assests/disconnect.svg";
import Wallet from "../assests/wallet.svg";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function Nav() {
	const router = useRouter();

	const [isConnect, setIsConnect] = useState(false);
	const [userDetails, setUserDetails] = useState(
		"0x2b5d1C88d09fd2Fd45500b6ADB7870F08A5dECd2"
	);

	const handleConnect = () => {
		setIsConnect((prev) => !prev);
	};

	const handleDisconnect = () => {
		setIsConnect((prev) => !prev);
	};

	const handleHome = () => {
		router.push("/");
	};

	return (
		<nav className="nav">
			<img src={Logo.src} onClick={handleHome} />

			<div className="nav-details">
				{isConnect && (
					<p className="nav-details__address" title={userDetails}>
						<img src={Wallet.src} />

						{userDetails.substring(0, 4) +
							"...." +
							userDetails.substring(userDetails.length - 4)}
					</p>
				)}

				{!isConnect ? (
					<button onClick={handleConnect} className="connect">
						Connect
					</button>
				) : (
					<button onClick={handleDisconnect} className="disconnect">
						<img src={Disconnect.src} />
						Disconnect
					</button>
				)}
			</div>
		</nav>
	);
}

export default Nav;
