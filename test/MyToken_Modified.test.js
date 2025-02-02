const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken_Modified", function () {
    async function deployTokenFixture(initialSupply = 2000) {
        const [owner, addr1, addr2] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("MyToken_Modified");
        const token = await Token.deploy(initialSupply);
        return { token, owner, addr1, addr2, initialSupply };
    }

    describe("Deployment", function () {
        it("Should assign the specified initial supply to the owner", async function () {
            const { token, owner, initialSupply } = await deployTokenFixture(5000);
            const ownerBalance = await token.balanceOf(owner.address);
            const decimals = await token.decimals();
            const expectedSupply = BigInt(initialSupply) * (10n ** BigInt(decimals));
            expect(ownerBalance).to.equal(expectedSupply);
        });
    });

    describe("Transactions", function () {
        it("Should transfer tokens between accounts", async function () {
            const { token, owner, addr1 } = await deployTokenFixture();
            await token.transfer(addr1.address, 100);
            expect(await token.balanceOf(addr1.address)).to.equal(100);
        });

        it("Should allow transferFrom with approval", async function () {
            const { token, owner, addr1, addr2 } = await deployTokenFixture();
            await token.approve(addr1.address, 50);
            await token.connect(addr1).transferFrom(owner.address, addr2.address, 50);
            expect(await token.balanceOf(addr2.address)).to.equal(50);
        });
    });

    describe("Transaction Info", function () {
        it("Should return the correct latest transaction sender", async function () {
            const { token, owner, addr1 } = await deployTokenFixture();
            await token.transfer(addr1.address, 100);
            expect(await token.getTransactionSender()).to.equal(owner.address);
        });

        it("Should return the correct latest transaction receiver", async function () {
            const { token, owner, addr1 } = await deployTokenFixture();
            await token.transfer(addr1.address, 100);
            expect(await token.getTransactionReceiver(addr1.address)).to.equal(addr1.address);
        });
    });
    describe("Timestamp", function () {
        it("Should return a formatted timestamp string", async function () {
            const { token } = await deployTokenFixture();
            const timestampString = await token.getLatestTransactionTimestamp();
            // A simple check to see if the returned string includes " days since Unix epoch"
            expect(timestampString).to.include(" days since Unix epoch");
        });
    });
});
