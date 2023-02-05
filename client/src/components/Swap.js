import { fetchBalanceETH } from "@/middleware/balances";
import { useState,useEffect } from "react";


import ETHLogo from "../assests/ETH.svg";
import FileCoinLogo from "../assests/Filecoin.svg";

function Swap() {
	const [fcToEth, setFcToEth] = useState(false);
	const [ethBalance, setEthBalance] = useState("0.00");
	const [filecoinBalance, setFilecoinBalance] = useState("1.00");


	useEffect(() => {
		async function run() {
			const {wETHBalance, FILBalance} = await fetchBalanceETH();
			setEthBalance(wETHBalance)
			setFilecoinBalance(FILBalance)
		}
		run();
	}, []);



	const [tokenInput, setTokenInput] = useState({
		eth: "",
		filecoin: "",
	});

	const [tokenSwapValue, setTokenSwapValue] = useState("1");

	const handleTokenSwap = () => {
		setFcToEth((prev) => !prev);
	};

	const Eth = (
		<div className="token-input">
			<div className="token-input__name">
				<img src={ETHLogo.src} />
				ETH
			</div>

			<input
				dir="rtl"
				type="text"
				value={tokenInput.eth}
				onChange={(e) =>
					setTokenInput((prev) => {
						return { ...prev, eth: e.target.value };
					})
				}
				placeholder="0"
			/>
		</div>
	);

	const filecoin = (
		<div className="token-input">
			<div className="token-input__name">
				<img src={FileCoinLogo.src} />
				FIL
			</div>

			<input
				dir="rtl"
				type="text"
				value={tokenInput.filecoin}
				onChange={(e) =>
					setTokenInput((prev) => {
						return { ...prev, filecoin: e.target.value };
					})
				}
				placeholder="0"
			/>
		</div>
	);

	return (
		<div className="swap">
			<h3>Swap on FileCoin testnet</h3>

			<div className="swap-options">
				<div className="swap-options__token">
					{fcToEth ? filecoin : Eth}

					<div className="token-details">
						<p>
							Balance:{" "}
							<span>
								{fcToEth ? (
									<>{filecoinBalance} FIL</>
								) : (
									<>{ethBalance} wETH</>
								)}
							</span>
						</p>
					</div>
				</div>

				<div className="interchange-button">
					<button onClick={handleTokenSwap}>⇅</button>
				</div>

				<div className="swap-options__token">
					<div className="token-input">
						{fcToEth ? (
							<div className="token-input__name">
								<img src={ETHLogo.src} />
								ETH
							</div>
						) : (
							<div className="token-input__name">
								<img src={FileCoinLogo.src} />
								FIL
							</div>
						)}

						<p>{tokenSwapValue}</p>
					</div>

					<div className="token-details">
						<p>
							Balance:{" "}
							<span>
								{!fcToEth ? (
									<>{filecoinBalance} FIL</>
								) : (
									<>{ethBalance} ETH</>
								)}
							</span>
						</p>
					</div>
				</div>
			</div>

			<div className="swap-buttons">
				{!fcToEth && <button>Approve</button>}

				<button>Swap</button>
			</div>
		</div>
	);
}

export default Swap;
