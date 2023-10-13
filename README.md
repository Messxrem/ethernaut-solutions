# [Ethernaut](https://ethernaut.openzeppelin.com/) Solutions

## Contents

1.  [Fallback](#01---fallback)
2.  [Fallout](#02---fallout)
3.  [Coinflip](#03---coinflip)
4.  [Telephone](#04---telephone)
5.  [Token](#05---token)
6.  [Delegation](#06---delegation)
7.  [Force](#07---force)
8.  [Vault](#08---vault)
9.  [King](#09---king)
10. [Re-entrancy](#10---re-entrancy)
11. [Elevator](#11---elevator)
12. [Privacy](#12---privacy)
13. [Gatekeeper One](#13---gatekeeper-one)
14. [Gatekeeper Two](#14---gatekeepertwo)
15. [Naught Coin](#15---naught-coin)
16. [Preservation](#16---preservation)

## 01 - Fallback

The goal of the challenges is to claim ownership of the contract and reduce its balance to 0  

In order to be the `owner` we have to send at least 1 wei to contract, which will tgrigger `receive()` function:

```solidity
receive() external payable {
  require(msg.value > 0 && contributions[msg.sender] > 0);
  owner = msg.sender;
}
```

To pass `require()` statements, we first need to call `contribute()` with value < 0.001 ETH:

```solidity
function contribute() public payable {
  require(msg.value < 0.001 ether);
  contributions[msg.sender] += msg.value;
}
```

After these steps, you become the owner of the contract and can call the "withdraw()" function.

[Script](./scripts/01-Fallback.ts) | [Test](./test/01-Fallback.spec.ts)

## 02 - Fallout

The goal of the challenges is to claim ownership of the contract.

In previous versions of Solidity there was no constructor function, so it had to be named with the same name as the contract.

In this case there a mistake with function name. So in order to be the `owner` we have to call `Fal1out()` function.

[Script](./scripts/02-Fallout.ts) | [Test](./test/02-Fallout.spec.ts)

## 03 - Coinflip

The goal of the challenges is to guess the correct outcome 10 times in a row.

In order to randomly choose a side, the contract uses the following logic:

```solidity
uint256 blockValue = uint256(blockhash(block.number.sub(1)));

lastHash = blockValue;
uint256 coinFlip = blockValue.div(FACTOR);
bool side = coinFlip == 1 ? true : false;
```

Generating random numbers using Solidity is a bad practice, we can create a contract function with the same random callculation, and use it to attack.

[Attacker](./contracts/attackers/CoinFlipAttacker.sol) | [Script](./scripts/03-CoinFlip.ts) | [Test](./test/03-CoinFlip.spec.ts)

## 04 - Telephone

The goal of the challenges is to claim ownership of the contract.

In order to be the `owner` we have to call `changeOwner()` with the our account address as the argument and pass `tx.origin != msg.sender` statement which is true if you call the function from a smart contract. Then `msg.sender` will be the attacker contract address, while `tx.origin` will be your account address:

```solidity
function changeOwner(address _owner) public {
  if (tx.origin != msg.sender) {
    owner = _owner;
  }
}
```

[Attacker](./contracts/attackers/TelephoneAttacker.sol) | [Script](./scripts/04-Telephone.ts) | [Test](./test/04-Telephone.spec.ts)

## 05 - Token

[Script](./scripts/05-Token.ts) | [Test](./test/05-Token.spec.ts)

## 06 - Delegation

The goal of the challenges is to claim ownership of the contract.

```typescript

```

[Attacker](./contracts/attackers/DelegateAttacker.sol) | [Script](./scripts/06-Delegation.ts) | [Test](./test/06-Delegation.spec.ts)

## 07 - Force

The goal of the challenges is to make the balance of the contract greater than zero.

In order to send ether to contract that does not realize `receive()` or `fallback()` we can use `selfdestruct()` function on attacker contract with victim address as a parameter. This function will send all contract balance to target address:

```solidity
constructor (address payable target) payable {
        require(msg.value > 0);
        selfdestruct(target);
    }
```

[Attacker](./contracts/attackers/ForceAttacker.sol) | [Script](./scripts/07-Force.ts) | [Test](./test/07-Force.spec.ts)

## 08 - Vault

The goal of the challenges is to unlock the vault

The `private` visibility modifier only says that other contracts are not allowed to read it. Using ethers.js we can still read the storage variable:

```solidity
const password = await provider.getStorage(instanceAddress, 1)

tx = await contract.connect(signer).unlock(password);
await tx.wait();
```

[Script](./scripts/08-Vault.ts) | [Test](./test/08-Vault.spec.ts)

## 09 - King

The goal of the challenges is to perform DOS (Denial of Service) attack.


[Attacker](./contracts/attackers/KingAttacker.sol) | [Script](./scripts/09-King.ts) | [Test](./test/09-King.spec.ts)

## 10 - Re-entrancy

The goal of the challenges is to

[Attacker](./contracts/attackers/ReentranceAttacker.sol) | [Script](./scripts/10-Reentrance.ts) | [Test](./test/10-Reentrance.spec.ts)

## 11 - Elevator

The goal of the challenges is to

[Attacker](./contracts/attackers/ElevatorAttacker.sol) | [Script](./scripts/11-Building.ts) | [Test](./test/11-Building.spec.ts)

## 12 - Privacy

The goal of the challenges is to

[Script](./scripts/12-Privacy.ts) | [Test](./test/12-Privacy.spec.ts)

## 13 - Gatekeeper One

The goal of the challenges is to

[Script](./scripts/13-GatekeeperOne.ts) | [Test](./test/13-GatekeeperOne.spec.ts)

## 14 - Gatekeeper Two

The goal of the challenges is to

[Script](./scripts/14-GatekeeperTwo.ts) | [Test](./test/14-GatekeeperTwo.spec.ts)

## 15 - Naught Coin

The goal of the challenges is to

[Script](./scripts/15-NaughtCoin.ts) | [Test](./test/15-NaughtCoin.spec.ts)

## 16 - Preservation

The goal of the challenges is to

[Attacker](./contracts/attackers/PreservationAttacker.sol) | [Script](./scripts/16-Preservation.ts) | [Test](./test/16-Preservation.spec.ts)
