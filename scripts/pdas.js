// scripts/generate_pdas.js
const { PublicKey } = require("@solana/web3.js");
const fs = require("fs");

// Bot addresses (match your config/addresses.ts)
const BOT_ADDRESSES = {
  Bot1:  "HKBJoeUWH6pUQuLd9CZWrJBzGSE9roEW4bshnxd9AHsR",
  Bot2:  "NqGHDaaLWmND7uShuaZkVbGNQFy6pS96qHyfR3pGR2d",
  Bot3:  "DbhKvqweZECTyYQ7PRJoHmKt8f262fsBCGHxSaD5BPqA",
  Bot4:  "7uSCVM1MJPKctrSRzuFN7qfVoJX78q6V5q5JuzRPaK41",
  Bot5:  "3oFCkoneQShDsJMZYscXew4jGwgLjpxfykHuGo85QyLw",
  Bot6:  "8duk9DzqBVXmqiyci9PpBsKuRCwg6ytzWywjQztM6VzS",
  Bot7:  "96891wG6iLVEDibwjYv8xWFGFiEezFQkvdyTrM69ou24",
  Bot8:  "2A8qGB3iZ21NxGjX4EjjWJKc9PFG1r7F4jkcR66dc4mb",
  Bot9:  "DQpMuSDAqWVXsNxyQ3jY3QsmNDtgq7q8g9vrFg1fA7E"
};

async function main() {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.error("Usage: node generate_pdas.js <PROGRAM_ID>");
    process.exit(1);
  }
  const programId = new PublicKey(args[0]);

  const vaultMap = {};

  for (const [name, botAddress] of Object.entries(BOT_ADDRESSES)) {
    const [pda] = await PublicKey.findProgramAddressSync(
      [Buffer.from("vault"), new PublicKey(botAddress).toBuffer()],
      programId
    );
    vaultMap[name] = { botAddress, vaultPDA: pda.toBase58() };
  }

  fs.writeFileSync("vaults.json", JSON.stringify(vaultMap, null, 2));
  console.log("✅ Vaults generated and saved to vaults.json");
}

main();
