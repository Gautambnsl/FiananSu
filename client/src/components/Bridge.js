import BridgeImg from "../assests/bridge-image.svg";
import EthereumLogo from "../assests/ethereum.svg";
import FileCoinLogo from "../assests/Filecoin.svg";
import USDCLogo from "../assests/USDC.svg";
import ETHLogo from "../assests/ETH.svg";

import { useEffect, useState } from "react";
import { fetchBalance } from "@/middleware/balances";

function Bridge() {
	const [balance, setBalance] = useState("0.00");
	const [balanceFVM, setBalanceFVM] = useState("0.00");
	const [tokenInput, setTokenInput] = useState();

	// 0->ETH, 1->USDC
	const [token, setToken] = useState(0);

	const handleChange = (e) => {
		const value = e.target.value;

		setTokenInput(value);
	};

	const handleMax = () => {
		setTokenInput("12");
	};

	const handleTokenInput = (e) => {
		setToken(e.target.value);
	};

	useEffect(() => {
		async function temp() {
			if (window.ethereum.selectedAddress) {
				const { ethBalance, filBalance } = await fetchBalance();

				setBalance(ethBalance);
				setBalanceFVM(filBalance);
				console.log("working");
				console.log(ethBalance);
				console.log(filBalance);
			}
		}
		temp();
	}, []);

	return (
		<div className="bridge">
			<div className="bridge-info">
				<h2>FileCoin Bridge</h2>

				<div>
					<p>Here's a bridge for you to use.</p>

					<img src={BridgeImg.src} />
				</div>
			</div>

			<div className="bridge-deposit">
				<div className="bridge-deposit__inputs">
					<div className="bridge-deposit__inputs-from">
						<h3>From</h3>

						<div className="bridge-deposit__inputs-from__info">
							<div className="chain">
								<div className="chain-name">
									<img src={EthereumLogo.src} />

									<p>Ethereum Chain</p>
								</div>

								<div className="chain-balance">
									<h5>Balance: </h5>

									<p>
										{balance} {token == 0 ? "ETH" : "USDC"}
									</p>
								</div>
							</div>

							<div className="token">
								<div className="token-type">
									<select
										value={token}
										onChange={handleTokenInput}
									>
										<option value={0}>
											<p>ETH</p>
										</option>

										<option value={1}>
											<p>USDC</p>
										</option>
									</select>
								</div>

								<div className="token-input">
									<input
										type="text"
										value={tokenInput}
										onChange={handleChange}
									/>

									<button onClick={handleMax}>MAX</button>
								</div>
							</div>
						</div>
					</div>

					<div className="bridge-deposit__inputs-to">
						<h3>To</h3>

						<div className="bridge-deposit__inputs-to__details">
							<div className="chain">
								<img src={FileCoinLogo.src} />

								<p>Filecoin Virtual Machine </p>
							</div>

							<div className="balance">
								<h5>Balance: </h5>

								<p>
									{balanceFVM} {token == 0 ? "wETH" : "USDC"}
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="bridge-deposit__transfer">
					{token == 1 && <button>Approve</button>}
					<button>Transfer</button>
				</div>
			</div>
		</div>
	);
}

export default Bridge;
