import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "./wallet/dev-wallet.json";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("7RGbqEbcemzYE5exnxwh3HkNDjkQnqt1yKUCFHJ4YvAY");

(async () => {
    try {
        // Create an ATA
        const ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey, false, commitment)
        console.log(`Your ata is: ${ata.address.toBase58()}`);
        //Your ata is: 8aD3AQQwSFciCbkmakXjp8bUQWf1tjrTuMgfu97YHTbM

        // Mint to ATA
        const mintTx = await mintTo(connection, keypair, mint, ata.address, keypair, 10_000_000_000n * token_decimals)
        console.log(`Your mint txid: ${mintTx}`);
        // Your mint txid: 5ENZg2wxuDtz4TdDvtnQQBeBfbZRZXWLmuSuKqY7H2ATRuHvAYGPypdkbkg9EsEzaNDwGLKBzB5wJFvbPVxr3ZN8

    } catch (error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
