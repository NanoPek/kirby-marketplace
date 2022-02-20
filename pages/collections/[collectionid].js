import React, {useEffect, useMemo, useState} from 'react'
import {useRouter} from "next/router";
import {useWeb3} from "@3rdweb/hooks";
import {client} from "../../lib/sanityClient";
import {ThirdwebSDK} from '@3rdweb/sdk'
import Header from "../../components/Header";
import NFTCard from "../../components/NFTCard";
import {AiOutlineGithub, AiOutlineTwitter} from "react-icons/ai";
import Layout from '../../components/Layout/Layout'

const style = {
    bannerImageContainer: `h-[30vh] w-screen overflow-hidden flex justify-center items-center`,
    bannerImage: `w-full object-cover`,
    infoContainer: `w-screen px-4`,
    midRow: `w-full flex justify-center text-white`,
    endRow: `w-full flex justify-end text-white`,
    profileImg: `w-60 h-60 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
    socialIconsContainer: `flex text-3xl mb-[-2rem]`,
    socialIconsWrapper: `w-22 mr-6`,
    socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg`,
    socialIcon: `p-2`,
    divider: `border-r-2`,
    title: `text-5xl font-bold mb-4`,
    createdBy: `text-lg mb-4`,
    statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
    collectionStat: `w-1/4`,
    statValue: `text-3xl font-bold w-full flex items-center justify-center`,
    ethLogo: `h-6 mr-2`,
    statName: `text-lg w-full text-center mt-1`,
    description: `text-[#f7bbcf] text-xl w-max-1/4 flex-wrap mt-4`,
}

const Collection = () => {
    const router = useRouter()
    const {provider} = useWeb3()
    const {collectionid} = router.query
    const [collection, setCollection] = useState({})
    const [nfts, setNfts] = useState([])
    const [listings, setListings] = useState([])

    // https://eth-rinkeby.alchemyapi.io/v2/R0S6-hnK8LmjB_xOiwViFMv3P2aCBQMS

    const nftModule = useMemo(() => {
        if (!provider) return
        const sdk = new ThirdwebSDK(
            provider.getSigner(),
            'https://eth-rinkeby.alchemyapi.io/v2/R0S6-hnK8LmjB_xOiwViFMv3P2aCBQMS'
        )
        return sdk.getNFTModule(collectionid)

    },[provider])

    useEffect(() => {
        if (!nftModule) return
        ;(async () => {
           const nfts = await nftModule.getAllWithOwner()

           setNfts(nfts)
        })()
    }, [nftModule])

    const marketPlaceModule = useMemo(() => {
        if (!provider) return

        const sdk = new ThirdwebSDK(
            provider.getSigner(),
            'https://eth-rinkeby.alchemyapi.io/v2/R0S6-hnK8LmjB_xOiwViFMv3P2aCBQMS'
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


    const fetchCollectionData = async (sanityClient = client) => {


        const query = `*[_type == "marketItems" && contractAddress == "${collectionid}"] {
  "imageUrl": profileImage.asset->url,
  'bannerImageUrl': bannerImage.asset->url,
  volumeTraded,
  createdBy,
  contractAddress,
  "creator": createdBy->userName,
  "twitter": createdBy ->twitterHandle,
  "github": createdBy ->igHandle,
  title, floorPrice,
  "allOwners": owners[],
  description
}`

        const collectionData = await sanityClient.fetch(query)

        await setCollection(collectionData[0])

    }

    useEffect(() => {
        fetchCollectionData()
    },[collectionid])
    console.log(`github.com/${collection?.github}`)
    return (
        <Layout>
            <div className={"overflow-hidden"}>
                <Header/>
                <div className={style.bannerImageContainer}>
                    <img className={style.bannerImage}
                         src={collection?.bannerImageUrl
                             ? collection.bannerImageUrl
                             : 'https://via.placeholder.com/20'
                         }
                         alt={"banner"}/>
                </div>
                <div className={style.infoContainer}>
                    <div className={style.midRow}>
                        <img className={style.profileImg}
                             src={collection?.imageUrl
                                 ? collection.imageUrl
                                 : 'https://via.placeholder.com/200'
                             }
                             alt={"profile image"}/>
                    </div>
                    <div className={style.endRow}>
                        <div className={style.socialIconsContainer}>
                            <div className={style.socialIconsWrapper}>
                                <div className={style.socialIconsContent}>
                                    <a className={style.socialIcon} href={`https://github.com/${collection?.github}`}>
                                        <AiOutlineGithub/>
                                    </a>
                                    <div className={style.divider}/>
                                    <a className={style.socialIcon} href={`https://twitter.com/${collection?.twitter}`} >
                                        <AiOutlineTwitter/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.midRow}>
                        <div className={style.title}>{collection?.title}</div>
                    </div>
                    <div className={style.midRow}>
                        <div className={style.createdBy} >
                            Created by {' '}
                            <a href={`https://github.com/${collection?.github}`} className={"text-[#f7bbcf]"}>{collection?.creator}</a>
                        </div>
                    </div>
                    <div className={style.midRow}>
                        <div className={style.statsContainer}>
                            <div className={style.collectionStat}>
                                <div className={style.statValue}>{nfts.length}</div>
                                <div className={style.statName}>items</div>
                            </div>
                            <div className={style.collectionStat}>
                                <div className={style.statValue}>
                                    {collection?.allOwners ? collection.allOwners.length : ''}
                                </div>
                                <div className={style.statName}>
                                    owners
                                </div>
                            </div>
                            <div className={style.collectionStat}>
                                <div className={style.statValue}>
                                    <img src={"https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"} alt={"eth"} className={style.ethLogo}/>
                                    {collection?.floorPrice}
                                </div>
                                <div className={style.statName}>floor price</div>
                            </div>
                            <div className={style.collectionStat}>
                                <div className={style.statValue}>
                                    <img src={"https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"} alt={"eth"} className={style.ethLogo}/>
                                    {collection?.volumeTraded}.5
                                </div>
                                <div className={style.statName}>volume traded</div>
                            </div>
                        </div>
                    </div>
                    <div className={style.midRow}>
                        <div className={style.description}>{collection?.description}</div>
                    </div>
                </div>
                <div className={"grid grid-cols-4"}>
                    {nfts.map((nftItem,id) => (
                        <NFTCard
                            key={id}
                            nftItem={nftItem.metadata}
                            owner={nftItem.owner}
                            title={collection?.title}
                            listings={listings}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Collection