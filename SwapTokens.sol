//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC20.sol";
import "./Uniswap.sol";

contract TestSwapToken{

    address private constant UNISWAP_V2_ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

    function swap(address _tokenIn, address _tokenOut, uint _amountIn, uint _amountOutMin, address _to) external {
        IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn);        //sending the _amountIn amount of tokens to this contract
        IERC20(_tokenIn).approve(UNISWAP_V2_ROUTER,_amountIn);      //approving uniswap to spend _amountIn amount of tokens

        address[] memory path;
        path = new address[](3);
        path[0] = _tokenIn;
        path[1] = WETH;
        path[2] = _tokenOut
        //we get the best deal if we swap the tokenin to WETH and then swap WETH with tokenOut

        IUniswapV2Router(UNISWAP_V2_ROUTER).swapExactTokensForTokens(_amountIn,_amountOutMin,path,_to, block.timestamp);
        
    }
}
