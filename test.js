const BN = require("bn.js");
const { it } = require("node:test");
const IERC20 = artifacts.require("IERC20");
const TestUniswap = artifacts.require("SwapTokens");

contract ("TestUniswap", (accounts) => {
    const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const DAI_WHALE="0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE";
    const WBTC = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";

    const WHALE = DAI_WHALE;
    const AMOUNT_IN = new BN(10).pow(new BN(18)).mul(new BN (1000000));
    const AMOUNT_OUT_MIN = 1;
    const TOKEN_IN = DAI;
    const TOKEN_OUT = WBTC;
    const TO = accounts[0];

    it("Should swap", async () => {
        const tokenIn = await IERC20.at(TOKEN_IN);
        const tokenOut = await IERC20.at(TOKEN_OUT);
        const testUniswap = await SwapToken.new();
    
        await tokenIn.approve(testUniswap.address, AMOUNT_IN, {from: WHALE});

        await testUniswap.swap(
            tokenIn.address,
            tokenOut.address,
            AMOUNT_IN,
            AMOUNT_OUT_MIN,
            TO,
            {
                from: WHALE,
            }

        );
        console.log(`out ${await tokenOut.balanceOf(TO)}`);
    });
});


// ganache-cli \
// > -- fork https://eth-goerli.g.alchemy.com/v2/qTwnH2mq5rbz6cfdLNi_1hA7NNmeJQsr
// > --unlock $0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE
// > --networkId 999