import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "./wallet/dev-wallet.json";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("7RGbqEbcemzYE5exnxwh3HkNDjkQnqt1yKUCFHJ4YvAY");

// Recipient address
const to = new PublicKey("BKYX34S6RJP4YjuLfcDRr2aBboCNL43ku4k4FuY9nTU1");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const fromWallet = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);
        console.log(`My Wallet is ${fromWallet.address}`)
        //My Wallet is 8aD3AQQwSFciCbkmakXjp8bUQWf1tjrTuMgfu97YHTbM

        // Get the token account of the toWallet address, and if it does not exist, create it
        const toWallet = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, to);
        console.log(`recipient Wallet is ${toWallet.address}`)
        // recipient Wallet is FMRjpYj8nbHCqmXT55pAAtntgDvJ426PngotbHYUH3w4

        // Transfer the new token to the "toTokenAccount" we just created
        const tx = await transfer(connection, keypair, fromWallet.address, toWallet.address, keypair, 10_000_000);
        console.log(`Transfer id is ${tx}`);
        // Transfer id is 3v7JhXnaxy9jJ3834x2HVqCWG8Ksm71uVS78rYTkMo21c9bb1MQiUHzkRQphFzchptXXmgEAT2nyvkBUiEJDKuHZ

    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();