import wallet from "./wallet/dev-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { 
    createMetadataAccountV3, 
    CreateMetadataAccountV3InstructionAccounts, 
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args
} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

// Define our Mint address
const mint = publicKey("7RGbqEbcemzYE5exnxwh3HkNDjkQnqt1yKUCFHJ4YvAY")

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
    try {
        // Start here
        let accounts: CreateMetadataAccountV3InstructionAccounts = {
            mint,
            mintAuthority: signer
        }

        let data: DataV2Args = {
            name: 'My Turbin3 Metadata',
            symbol: 'KKSOL',
            uri: 'https://raw.githubusercontent.com/devflow-karan/kk-token/master/meta-data.json',
            sellerFeeBasisPoints: 0,
            creators: null,
            collection: null,
            uses: null
        }

        let args: CreateMetadataAccountV3InstructionArgs = {
            data,
            isMutable: true,
            collectionDetails: null
        }

        let tx = createMetadataAccountV3(
            umi,
            {
                ...accounts,
                ...args
            }
        )

        let result = await tx.sendAndConfirm(umi);
        console.log(bs58.encode(result.signature));
        //2VcFuj4qDm42n8UiZTb85p22aEKKLZGWm1chRnYgXUMnciSsxdyvQG4JZC4FBm4VM9iPYN29P4UL5v7yC3wfyUiR
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();
