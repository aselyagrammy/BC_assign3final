# BC_assign3final
![image](https://github.com/user-attachments/assets/b3eddca4-8914-428d-aa1a-28393178e57c)

# Assignment 3, Part 2 - Blockchain Technologies 1

## Project Overview
This project involves writing and testing smart contracts using Hardhat. The key tasks include:
- Writing test cases for the initial version of the smart contract developed in Assignment 3, Part 1.
- Modifying the smart contract's constructor to accept an input parameter and ensuring meaningful usage.
- Writing test cases for the modified version of the smart contract.

## Prerequisites
Before running this project, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Hardhat](https://hardhat.org/)
- A compatible Ethereum wallet (e.g., MetaMask)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/aselyagrammy/BC_assign3final.git
   ```
2. Navigate to the project directory:
   ```sh
   cd BC_assign3final
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Usage
### Running Tests
To execute the test cases for both the initial and modified versions of the smart contract, run:
```sh
npx hardhat test
```

### Deploying the Smart Contract
1. Compile the contract:
   ```sh
   npx hardhat compile
   ```
2. Deploy the contract to a local Hardhat network:
   ```sh
   npx hardhat run scripts/deploy.js --network localhost
   ```
3. For deployment to a testnet, update the Hardhat configuration and run:
   ```sh
   npx hardhat run scripts/deploy.js --network testnet
   ```

## Example Tests
Below is an example of how a test case is structured in Hardhat:
```js
const { expect } = require("chai");

describe("SmartContract", function () {
  it("Should initialize with the correct value", async function () {
    const Contract = await ethers.getContractFactory("SmartContract");
    const contract = await Contract.deploy("InitialValue");
    await contract.deployed();

    expect(await contract.getValue()).to.equal("InitialValue");
  });
});
```

## License
This project is licensed under the [MIT License](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/LICENSE).

## References
- [Hardhat Tutorial](https://hardhat.org/tutorial)
- [Testing Contracts in Hardhat](https://hardhat.org/tutorial/testing-contracts)

