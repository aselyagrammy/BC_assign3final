// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    // Constructor to initialize the ERC20 token with a name, symbol, and 2000 pre-mined tokens
    constructor() ERC20("AstanaIT_2324", "MTK") {
        _mint(msg.sender, 2000 * 10 ** decimals()); // Mint 2000 tokens to the deploying address
    }

    // Function to return the block timestamp of the latest transaction in a human-readable format
    function getLatestTransactionTimestamp() public view returns (string memory) {
        return _formatTimestamp(block.timestamp);
    }

    // Helper function to format the timestamp in a human-readable format
    function _formatTimestamp(uint256 timestamp) internal pure returns (string memory) {
        unchecked {
            uint256 daysSinceEpoch = timestamp / (60 * 60 * 24); // division in unchecked block
            return string(abi.encodePacked(uint2str(daysSinceEpoch), " days since Unix epoch"));
        }
    }

    // Function to retrieve the address of the sender of the transaction
    function getTransactionSender() public view returns (address) {
        return msg.sender;
    }

    // Function to retrieve the address of the receiver of the transaction
    function getTransactionReceiver(address receiver) public pure returns (address) {
        return receiver;
    }

    // Helper function to convert uint to string (used in timestamp formatting)
    function uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 temp = _i;
        uint256 digits;
        // Count the number of digits in _i
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        // Fill the buffer from the end
        while (_i != 0) {
            digits -= 1; // Decrement first so it doesn't underflow
            buffer[digits] = bytes1(uint8(48 + _i % 10));
            _i /= 10;
        }
        return string(buffer);
    }
}
