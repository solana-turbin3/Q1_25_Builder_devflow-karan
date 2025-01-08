import { Transaction, SystemProgram, Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js"
// Import our dev wallet keypair from the wallet file
import wallet from "./dev-wallet.json"
const from = Keypair.fromSecretKey(new Uint8Array(wallet));
// Define our Turbin3 public key
const to = new PublicKey("2oCZp7RrExMoGoVTsGuoTtgbyBR99ewJzHuWh8m1XBoj");
const connection = new Connection("https://api.devnet.solana.com");

// (async () => {
//   try {
//     const transaction = new Transaction().add(
//       SystemProgram.transfer({
//         fromPubkey: from.publicKey,
//         toPubkey: to,
//         lamports: LAMPORTS_PER_SOL / 100,
//       })
//     );
//     transaction.recentBlockhash = (
//       await connection.getLatestBlockhash("confirmed")
//     ).blockhash;

//     transaction.feePayer = from.publicKey;
//     const signature = await sendAndConfirmTransaction(connection, transaction, [
//       from,
//     ]);
//     console.log(`Success! Check out your TX here:
//     https://explorer.solana.com/tx/${signature}?cluster=devnet`);
//   } catch (e) {
//     console.error(`Oops, something went wrong: ${e}`);
//   }
// })();

//Tranfering ALL balance to devnet Wallet Address
(async () => {
    try {
      // Get balance of dev wallet
      const balance = await connection.getBalance(from.publicKey);
      // Create a test transaction to calculate fees
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: from.publicKey,
          toPubkey: to,
          lamports: balance,
        })
      );
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash("confirmed")
      ).blockhash;
  
      transaction.feePayer = from.publicKey;
  
      const fee =
        (
          await connection.getFeeForMessage(
            transaction.compileMessage(),
            "confirmed"
          )
        ).value || 0;
      transaction.instructions.pop();
  
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: from.publicKey,
          toPubkey: to,
          lamports: balance - fee,
        })
      );
  
      const signature = await sendAndConfirmTransaction(connection, transaction, [
        from,
      ]);
      console.log(`Success! Check out your TX here:
      https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    } catch (e) {
      console.error(`Oops, something went wrong: ${e}`);
    }
  })();