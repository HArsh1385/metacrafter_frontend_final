# MetaCrafter Frontend 

This project is a decentralized application (dApp) that simulates an ATM and a marketplace on the Ethereum blockchain. The dApp enables users to interact with an Ethereum smart contract to manage funds, add items for sale, and make purchases using Ethereum.

## Features

- **Deposit and Withdraw ETH:** The contract owner can manage funds by depositing and withdrawing ETH.
- **Manage Marketplace Items:** Add items to the marketplace with specific prices.
- **Purchase Items:** Users can buy items using ETH.
- **View Balance and Transactions:** Users can check their balance and view transaction history.
- **Display Items for Sale:** The application shows available items and their purchase status.

## Prerequisites

Ensure you have the following tools installed:

- **Node.js:** Version 14 or higher
- **npm:** Version 6 or higher
- **Hardhat:** Version 2.7.0 or higher
- **MetaMask:** Browser extension for interacting with Ethereum

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/naman221462/metacrafter_frontend_final.git
   ```

2. **Install Dependencies**

   Navigate to the project directory and install the required packages:

   ```bash
   cd metacrafter_frontend_final
   npm install
   ```

3. **Set Up Hardhat Node**

   Open two additional terminals:

   - **Terminal 1:** Start a Hardhat local node:

     ```bash
     npx hardhat node
     ```

   - **Terminal 2:** Deploy the smart contract to the local node:

     ```bash
     npx hardhat run --network localhost scripts/deploy.js
     ```

4. **Run the Frontend**

   Back in the first terminal, start the development server:

   ```bash
   npm run dev
   ```

   The application will be accessible at [http://localhost:3000](http://localhost:3000).

## Interacting with the dApp

1. **Connecting MetaMask**

   - Install the MetaMask browser extension if you haven't already.
   - Connect MetaMask to the local network (localhost:8545).
   - Import an account using one of the private keys from the Hardhat local node.

2. **Using the dApp**

   - **Connect Wallet:** Click the button to connect your MetaMask wallet.
   - **Deposit ETH:** Use the "Deposit 1 ETH" button to deposit 1 ETH into the contract.
   - **Withdraw ETH:** Use the "Withdraw 1 ETH" button to withdraw 1 ETH from the contract.
   - **Buy Items:** Click the "Buy" button next to an available item to purchase it.
   - **View Balance and Transactions:** The UI will show your current balance and transaction history.
