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
17. [Recovery](#17---recovery)
18. [MagicNumber](#18---magicnumber)
19. [AlienCodex](#19---aliencodex)
20. [Denial](#20---denial)
21. [Shop](#21---shop)
22. [DEX](#22---dex)
23. [DEX TWO](#23---dex-two)
24. [Puzzle Wallet](#24---puzzle-wallet)
25. [Motorbike](#25---Motorbike)
26. [DoubleEntryPoint](#26---doubleentrypoint)

## 01 - Fallback

The goal of the challenges is to claim ownership of the contract and reduce its balance to 0  

In order to be the `owner` we have to send at least 1 wei to contract, which will tgrigger `receive()` function.

```solidity
receive() external payable {
  require(msg.value > 0 && contributions[msg.sender] > 0);
  owner = msg.sender;
}
```
To pass `require()` statements, we first need to call `contribute()` with value < 0.001 ETH.

After these steps, you become the owner of the contract and can call the "withdraw()" function.

[Script](./scripts/01-Fallback.ts) | [Test](./test/01-Fallback.spec.ts)

## 02 - Fallout

[Script](./scripts/02-Fallout.ts) | [Test](./test/02-Fallout.spec.ts)

## 03 - Coinflip

[Script](./scripts/03-CoinFlip.ts) | [Test](./test/03-CoinFlip.spec.ts)

## 04 - Telephone

[Script](./scripts/04-Telephone.ts) | [Test](./test/04-Telephone.spec.ts)

## 05 - Token

[Script](./scripts/05-Token.ts) | [Test](./test/05-Token.spec.ts)

## 06 - Delegation

[Script](./scripts/06-Delegation.ts) | [Test](./test/06-Delegation.spec.ts)

## 07 - Force

[Script](./scripts/07-Force.ts) | [Test](./test/07-Force.spec.ts)

## 08 - Vault

[Script](./scripts/08-Vault.ts) | [Test](./test/08-Vault.spec.ts)

## 09 - King

[Script](./scripts/09-King.ts) | [Test](./test/09-King.spec.ts)

## 10 - Re-entrancy

[Script](./scripts/10-Reentrance.ts) | [Test](./test/10-Reentrance.spec.ts)

## 11 - Elevator

[Script](./scripts/11-Building.ts) | [Test](./test/11-Building.spec.ts)

## 12 - Privacy

[Script](./scripts/12-Privacy.ts) | [Test](./test/12-Privacy.spec.ts)

## 13 - Gatekeeper One

[Script](./scripts/13-GatekeeperOne.ts) | [Test](./test/13-GatekeeperOne.spec.ts)

## 14 - Gatekeeper Two

[Script](./scripts/14-GatekeeperTwo.ts) | [Test](./test/14-GatekeeperTwo.spec.ts)

## 15 - Naught Coin

[Script](./scripts/15-NaughtCoin.ts) | [Test](./test/15-NaughtCoin.spec.ts)

## 16 - Preservation

[Script](./scripts/16-Preservation.ts) | [Test](./test/16-Preservation.spec.ts)
