import React, {useEffect, useState} from 'react';
import {BiHeart} from "react-icons/bi";
import {useRouter} from "next/router";
import {client} from "../lib/sanityClient";

const style = {
    wrapper: `bg-[#660c34] flex-auto my-10 mx-5 rounded-2xl overflow-hidden cursor-pointer`,
    imgContainer: `h-3/4 w-full overflow-hidden flex justify-center items-center`,
    nftImg: `w-full object-cover`,
    details: `p-3`,
    info: `flex justify-between text-[#e4e8eb] drop-shadow-xl`,
    infoLeft: `flex-0.6 flex-wrap`,
    collectionName: `font-semibold text-sm text-[#f7bbcf]`,
    assetName: `font-bold text-lg mt-2`,
    infoRight: `flex-0.4 text-right`,
    priceTag: `font-semibold text-sm text-[#f7bbcf]`,
    priceValue: `flex items-center text-xl font-bold mt-2`,
    ethLogo: `h-5 mr-2`,
    likes: `text-[#f7bbcf] font-bold flex items-center w-full justify-end `,
    likeIcon: `text-xl mr-2`,
    ownedBy: `text-[#f7bbcf] mr-4`,
}

const NFTCard = ({nftItem, title, listings,owner}) => {

    const [isListed, setListed] = useState(false)
    const [price,setPrice] = useState(0)
    const [ownerName, setOwnerName] = useState(owner)

    const router = useRouter()

    const fetchOwnerData = async (sanityClient = client) => {

        const query = `*[_type == "users"  && walletAddress == "${owner}"] {
  userName
}`

        const OwnerData = await sanityClient.fetch(query)

        await setOwnerName(OwnerData[0].userName)
    }

    useEffect(() => {
        fetchOwnerData()
    },[ownerName])

    useEffect(() => {
        const listing = listings.find((listing) => listing.asset.id === nftItem.id)
        if (Boolean(listing)) {
            setListed(true)
            setPrice(listing.buyoutCurrencyValuePerToken.displayValue)
        }
    }, [listings, nftItem])


    return (
        <div
            className={style.wrapper}
            onClick={() => {
                router.push({
                    pathname: `/nfts/${nftItem.id}`,
                    query: { isListed: isListed },
                })
            }}
        >
            <div className={style.imgContainer}>
                <img src={nftItem.image} alt={nftItem.name} className={style.nftImg} />
            </div>
            <div className={style.details}>
                <div className={style.info}>
                    <div className={style.infoLeft}>
                        <div className={style.collectionName}>{title}</div>
                        <div className={style.assetName}>{nftItem.name}</div>
                        <div className={style.ownedBy}>Owned by {ownerName}</div>
                    </div>
                    {isListed && (
                        <div className={style.infoRight}>
                            <div className={style.priceTag}>Price</div>
                            <div className={style.priceValue}>
                                <img
                                    src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                                    alt="eth"
                                    className={style.ethLogo}
                                />
                                {price}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NFTCard;