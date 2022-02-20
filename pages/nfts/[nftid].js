import React, {useEffect, useState, useMemo} from 'react'
import Header from "../../components/Header";
import {useWeb3} from "@3rdweb/hooks";
import {useRouter} from "next/router";
import {ThirdwebSDK} from "@3rdweb/sdk";
import NFTImage from "../../components/nft/NFTImage";
import GeneralDetails from "../../components/nft/GeneralDetails";
import ItemActivity from '../../components/nft/ItemActivity'
import Purchase from '../../components/nft/Purchase'
import Layout from "../../components/Layout/Layout";

const style = {
    wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
    container: `container p-6`,
    topContent: `flex`,
    nftImgContainer: `flex-initial mr-4`,
    detailsContainer: `flex-[2] ml-4`,
}

const Nft = () => {

    const {provider} = useWeb3()
    const [selectedNft, setSelectedNft] = useState()
    const [listings, setListings] = useState([])
    const router = useRouter()

    const nftModule = useMemo(() => {
        if (!provider) return

        const sdk = new ThirdwebSDK(
            provider.getSigner(),
            'https://eth-rinkeby.alchemyapi.io/v2/R0S6-hnK8LmjB_xOiwViFMv3P2aCBQMS'
        )
        return sdk.getNFTModule('0x0b8faBC9F67027aCfBfd173e74c66FfeBb02315e')
    }, [provider])

    // get all NFTs in the collection
    useEffect(() => {
        if (!nftModule) return
            ;(async () => {
            const nfts = await nftModule.getAllWithOwner()
            console.log(typeof nfts)

            const selectedNftItem = nfts.find((nft) => nft.metadata.id === router.query.nftid)


            setSelectedNft(selectedNftItem)
        })()
    }, [nftModule])

    const marketPlaceModule = useMemo(() => {
        if (!provider) return

        const sdk = new ThirdwebSDK(
            provider.getSigner(),
            'https://rinkeby.infura.io/v3/a464b9152d8c466c8a94a514fce8e837'
        )

        return sdk.getMarketplaceModule(
            '0x81f900E2e3B3f23Bf93dE0590dEaEc9c8b187263'
        )
    }, [provider])

    useEffect(() => {
        if (!marketPlaceModule) return
            ;(async () => {
            const allListings = await marketPlaceModule.getAllListings()
            setListings(allListings.filter((listing) => listing.quantity > 0))

        })()

    }, [marketPlaceModule])





    return (
        <Layout>
        <div>
            <Header />
            <div className={style.wrapper}>
                <div className={style.container}>
                    <div className={style.topContent}>
                        <div className={style.nftImgContainer}>
                            <NFTImage selectedNft={selectedNft} />
                        </div>
                        <div className={style.detailsContainer}>
                            <GeneralDetails selectedNft={selectedNft} />
                            <Purchase
                                isListed={router.query.isListed}
                                selectedNft={selectedNft}
                                listings={listings}
                                marketPlaceModule={marketPlaceModule}
                            />
                        </div>
                    </div>
                    <ItemActivity />
                </div>
            </div>
        </div>
        </Layout>
    )
}

export default Nft