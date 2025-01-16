import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import wallet from "./wallet/dev-wallet.json"
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi);

(async () => {
    let tx =  await createNft(umi, {
        mint,
        name: "My First Turbin3 NFT",
        uri: "https://devnet.irys.xyz/2AnQUVGaTsgCRrDEUpo9GkXpLN7HmaTkSJxvseR4udKg",
        sellerFeeBasisPoints: percentAmount(0),
    });
    let result = await tx.sendAndConfirm(umi);
    const signature = base58.encode(result.signature);
    
    console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)

    console.log("Mint Address: ", mint.publicKey);
     //Succesfully Minted! Check out your TX here: 
     // https://explorer.solana.com/tx/5rSwe9Pr47ABYkooSs8iXaRnaPgZvdLiPxCnL1ZihsRV2FhtAxMjbsBQxqdyjCdLt1GsRV9N2qZs9guvaKnjkHUv?cluster=devnet
     // Mint Address:  6tPsRrG2ojqU7rrzg82EfokNjeQTLTN7whr3apdP6Ark
})();