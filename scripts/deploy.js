const hre = require("hardhat");

async function main() {
  const initBalance = 0;
  const items = [
    { name: "Item 1", price: 1 },  // Price in ETH as integer
    { name: "Item 2", price: 2 },
    { name: "Item 3", price: 3 },
  ];

  // Compile contract and deploy
  const Assessment = await hre.ethers.getContractFactory("Assessment");
  const assessment = await Assessment.deploy(initBalance);
  await assessment.deployed();

  console.log(`Contract deployed to: ${assessment.address}`);
  console.log(`Initial balance: ${initBalance} ETH`);

  // Check owner
  const owner = await assessment.owner();
  console.log(`Contract owner: ${owner}`);

  // Add items
  for (const item of items) {
    const tx = await assessment.addItem(item.name, ethers.utils.parseEther(item.price.toString()));
    await tx.wait();
    console.log(`Item "${item.name}" with price ${item.price} ETH added successfully.`);
  }

  console.log("All items added successfully.");
}

main().catch((error) => {
  console.error("Error deploying contract or adding items:", error);
  process.exitCode = 1;
});
