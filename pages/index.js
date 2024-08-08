import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [transactions, setTransactions] = useState([]);
  const [items, setItems] = useState([]);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Update with your contract address
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    } else {
      alert("MetaMask is required to interact with this app");
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    try {
      const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
      handleAccount(accounts);

      // once wallet is set we can get a reference to our deployed contract
      getATMContract();
    } catch (error) {
      console.error("Error connecting account:", error);
    }
  };

  const getATMContract = () => {
    if (ethWallet) {
      const provider = new ethers.providers.Web3Provider(ethWallet);
      const signer = provider.getSigner();
      const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

      setATM(atmContract);
    }
  };

  const getBalance = async () => {
    if (atm) {
      try {
        const balance = await atm.getBalance();
        setBalance(ethers.utils.formatEther(balance));
      } catch (error) {
        console.error("Error getting balance:", error);
      }
    }
  };

  const getItems = async () => {
    if (atm) {
      try {
        const itemCount = await atm.getItemCount();
        const items = [];

        for (let i = 0; i < itemCount; i++) {
          const item = await atm.getItem(i);
          items.push({
            id: i,
            name: item[0],
            price: ethers.utils.formatEther(item[1]),
            available: item[2],
          });
        }

        setItems(items);
      } catch (error) {
        console.error("Error getting items:", error);
      }
    }
  };

  const buyItem = async (itemId, itemPrice) => {
    if (atm) {
      try {
        const tx = await atm.buyItem(itemId, {
          value: ethers.utils.parseEther(itemPrice.toString()),
        });
        await tx.wait();
        alert("Item bought successfully!");
        getBalance();
        getItems();
      } catch (error) {
        console.error("Error buying item:", error);
        alert("Failed to buy item");
      }
    }
  };

  const deposit = async () => {
    if (atm) {
      try {
        let tx = await atm.deposit(ethers.utils.parseEther("1"));
        await tx.wait();
        getBalance();
        setTransactions([...transactions, { type: "Deposit", amount: 1 }]);
      } catch (error) {
        console.error("Error depositing:", error);
        alert("Failed to deposit");
      }
    }
  };

  const withdraw = async () => {
    if (atm) {
      try {
        let tx = await atm.withdraw(ethers.utils.parseEther("1"));
        await tx.wait();
        getBalance();
        setTransactions([...transactions, { type: "Withdraw", amount: 1 }]);
      } catch (error) {
        console.error("Error withdrawing:", error);
        alert("Failed to withdraw");
      }
    }
  };

  const resetBalance = () => {
    setBalance(0);
    setTransactions([]);
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>;
    }

    if (balance === undefined) {
      getBalance();
      getItems();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance} ETH</p>
        <button onClick={deposit}>Deposit 1 ETH</button>
        <button onClick={withdraw}>Withdraw 1 ETH</button>
        <button onClick={resetBalance}>Reset Balance</button>
        <h3>Transaction History</h3>
        <ul>
          {transactions.map((tx, index) => (
            <li key={index}>{tx.type} of {tx.amount} ETH</li>
          ))}
        </ul>
        <h3>Items for Sale</h3>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.name} - {item.price} ETH
              {item.available && <button onClick={() => buyItem(item.id, item.price)}>Buy</button>}
              {!item.available && <span> (Sold)</span>}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome to My Web3 ATM!</h1>
        <h2>Hola Web3 Enthusiasts!!</h2>
        <p>Experience the power of Web3 and decentralized finance.</p>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          background-color: #000000;
          color: #ffffff;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </main>
  );
}

