//SPDX-License-Identifier: MIT
pragma solidity 0.5.16;
import "@chainlink/contracts/src/v0.5/interfaces/AggregatorV3Interface.sol";

interface IChainlinkOracle {
    function getLatestPrice() external returns(int);
}

contract Oracles {
    AggregatorV3Interface internal avaxPriceFeed;

    constructor() public {
        avaxPriceFeed = AggregatorV3Interface(0x6Df09E975c830ECae5bd4eD9d90f3A95a4f88012);
    }

    function getLatestPrice() public view returns(int) {
        (
            uint roundId,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = avaxPriceFeed.latestRoundData();

        return price;
    }
}
