import BridgeImg from "../assests/bridge-image.svg";
import EthereumLogo from "../assests/ethereum.svg";
import FileCoinLogo from "../assests/Filecoin.svg";
import USDCLogo from "../assests/USDC.svg";

import { useEffect, useState } from "react";
import { fetchBalance } from "@/middleware/balances";

function Bridge() {
	const [tokenBalance, setTokenBalance] = useState("0.00");
	const [tokenBalanceFVM, setTokenBalanceFVM] = useState("0.00");
	const [tokenInput, setTokenInput] = useState();

	const handleChange = (e) => {
		const value = e.target.value;

		setTokenInput(value);
	};

	const handleMax = () => {
		setTokenInput("12");
	};


	useEffect(()=>{
		async function temp(){
			if(window.ethereum.selectedAddress){
				const {ethBalance, filBalance} = await fetchBalance()

				setTokenBalance(ethBalance);
				setTokenBalanceFVM(filBalance)
				console.log("working");
				console.log(ethBalance);
				console.log(filBalance);
			}
		}
		temp();
	},[])

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

									<p>{tokenBalance} ETH</p>
								</div>
							</div>

							<div className="token">
								<div className="token-type">
									<img src={USDCLogo.src} />

									<p>USDC</p>
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

								<p>{tokenBalanceFVM} FIL</p>
							</div>
						</div>
					</div>
				</div>

				<div className="bridge-deposit__transfer">
					<button>Transfer</button>
				</div>
			</div>
		</div>
	);
}

export default Bridge;
