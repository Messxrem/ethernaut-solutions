# Sample Hardhat Project

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
