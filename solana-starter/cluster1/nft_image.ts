import wallet from "./wallet/dev-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');
const imagePath = "./generug.png"

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        //1. Load image
        const image = await readFile(imagePath);

        //2. Convert image to generic file.
        const genericFile = await createGenericFile(image, "generug.png", {
            displayName: "Turbin3 Rug",
            contentType: "image/png"
        })
        
        //3. Upload image
        const [myUri] = await umi.uploader.upload([genericFile])
        console.log("Your image URI: ", myUri);
        //Your image URI:  https://arweave.net/9NCdrToM5KMdt1wt2ABTZnt7mXnUyGfzLNdbBqGgbVp2
        //https://devnet.irys.xyz/9NCdrToM5KMdt1wt2ABTZnt7mXnUyGfzLNdbBqGgbVp2
    }
    catch (error) {
        console.log("Oops.. Something went wrong", error);
    }
})();