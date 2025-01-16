import wallet from "./wallet/dev-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = "https://devnet.irys.xyz/9NCdrToM5KMdt1wt2ABTZnt7mXnUyGfzLNdbBqGgbVp2"
        const metadata = {
            name: "Turbin3 Rugg",
            symbol: "TRUG",
            description: "Demo Rug Day",
            image,
            attributes: [
                { trait_type: '', value: '' }
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: "https://devnet.irys.xyz/9NCdrToM5KMdt1wt2ABTZnt7mXnUyGfzLNdbBqGgbVp2"
                    },
                ]
            },
            creators: []
        };
        const myUri = await umi.uploader.uploadJson(metadata);
        console.log("Your metadata URI: ", myUri);
        //https://devnet.irys.xyz/2AnQUVGaTsgCRrDEUpo9GkXpLN7HmaTkSJxvseR4udKg
    }
    catch (error) {
        console.log("Oops.. Something went wrong", error);
    }
})();