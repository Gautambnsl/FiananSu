const { ethers } = require("ethers");

export function fetchBalance(){
    const providerETH = new ethers.providers.JsonRpcProvider('https://eth-goerli.g.alchemy.com/v2/swE9yoWrnP9EzbOKdPsJD2Hk0yb3-kDr');
    const providerFIL = new ethers.providers.JsonRpcProvider('https://api.hyperspace.node.glif.io/rpc/v0');
    const address = window.ethereum.selectedAddress;
    let filBalance;
    let ethBalance;
    providerETH.getBalance(address).then((balance) => {
        // convert a currency unit from wei to ether
        const balanceInEth = ethers.utils.formatEther(balance)
        ethBalance = balanceInEth;
        console.log(`balance: ${balanceInEth} ETH`)
    })
    providerFIL.getBalance(address).then((balance) => {
        // convert a currency unit from wei to ether
        const balanceInFil = ethers.utils.formatEther(balance)
        filBalance = balanceInFil;
        console.log(`balance: ${balanceInFil} FIL`)
       })

       return {ethBalance,filBalance}

}