const { Network, Alchemy } = require("alchemy-sdk");
const dotenv = require("dotenv");

dotenv.config();

const settings = {
        apiKey: process.env.ALCHEMY_API_KEY,
        network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const nfts = async () => {
        return await alchemy.nft.getNftsForOwner(
                "0x2BCD25D8D7bB17206d83cb359Fbacf16aBD2796C"
        );
};

const main = async () => {
        const nftList = await nfts();
        console.log(nftList.ownedNfts[0].tokenUri);
};

main();

//https://ipfs.io/ipfs/QmYL2tZCSGLDGEHfbpX72Sceu8GzzMsPdCwmoCjicGjZYL
