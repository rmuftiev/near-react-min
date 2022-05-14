//SPDX-License-Identifier: MIT
pragma solidity 0.5.16;
pragma experimental ABIEncoderV2;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

import "opium-contracts/contracts/Lib/LibDerivative.sol";
import "erc721o/contracts/Libs/LibPosition.sol";

import "./interfaces/ICore.sol";
import "./interfaces/ISyntheticAggregator.sol";
import "./interfaces/IRegistry.sol";
import "../Oracles.sol";

contract DerivativeDepositFactory is LibDerivative, Ownable, Oracles {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    using LibPosition for bytes32;

    address tokenSpender;
    ICore core;
    ISyntheticAggregator syntheticAggregator;
    Derivative public derivative;

    constructor(address _registry) public {
        IRegistry registry = IRegistry(_registry);
        syntheticAggregator = ISyntheticAggregator(registry.getSyntheticAggregator());
        core = ICore(registry.getCore());
        tokenSpender = registry.getTokenSpender();
    }

    function setDerivative(Derivative memory _derivative) public onlyOwner {
        derivative = _derivative;
    }

    function getDerivativeHash() external view returns (bytes32) {
        return getDerivativeHash(derivative);
    }

    // @param _addresses (buyer, seller)
    function depositDerivative(uint256 _amount, address[2] calldata _addresses) external {
        (uint256 buyerMargin, uint256 sellerMargin) = syntheticAggregator.getMargin(
            getDerivativeHash(derivative),
            derivative
        );
        uint256 requiredMargin = _computeMarginRequirement(buyerMargin, sellerMargin, _amount);
        IERC20(derivative.token).safeTransferFrom(msg.sender, address(this), requiredMargin);
        IERC20(derivative.token).approve(tokenSpender, 0);
        IERC20(derivative.token).approve(tokenSpender, requiredMargin);
        core.create(derivative, _amount, _addresses);
    }

    function executeShort(uint256 _amount) external {
        bytes32 derivativeHash = getDerivativeHash(derivative);
        uint256 shortTokenId = derivativeHash.getShortTokenId();
        core.execute(msg.sender, shortTokenId, _amount, derivative);
    }

    function executeLong(uint256 _amount) external {
        bytes32 derivativeHash = getDerivativeHash(derivative);
        uint256 longTokenId = derivativeHash.getLongTokenId();
        core.execute(msg.sender, longTokenId, _amount, derivative);
    }

    function fetchPrice() public view returns (int256 price) {
        int256 avaxPrice = this.getLatestPrice();
        return avaxPrice;
    }

    // TODO: compute margin in own way.
    function _computeMarginRequirement(
        uint256 _buyerMargin,
        uint256 _sellerMargin,
        uint256 _amount
    ) private pure returns (uint256) {
        return _buyerMargin.add(_sellerMargin).mul(_amount);
    }
}
