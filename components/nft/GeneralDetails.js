import { AiFillHeart } from 'react-icons/ai'
import { MdRefresh } from 'react-icons/md'
import { RiShareBoxLine } from 'react-icons/ri'
import { FiMoreVertical } from 'react-icons/fi'
import { GiShare } from 'react-icons/gi'
import {client} from "../../lib/sanityClient";
import {useEffect, useState} from "react";

const style = {
    wrapper: `flex`,
    infoContainer: `h-36 flex flex-col flex-1 justify-between mb-6`,
    accent: `text-[#f7bbcf]`,
    nftTitle: `text-3xl font-extrabold`,
    nftDescription: `text-l font-bold`,
    otherInfo: `flex`,
    ownedBy: `text-[#f7bbcf] mr-4`,
    likes: `flex items-center text-[#f7bbcf]`,
    likeIcon: `mr-1`,
    actionButtonsContainer: `w-44`,
    actionButtons: `flex container justify-between text-[1.4rem] border-2 rounded-lg`,
    actionButton: `my-2`,
    divider: `border-r-2`,
}

const GeneralDetails = ({selectedNft}) => {
    const [owner, setOwner] = useState()


    const fetchOwnerData = async (sanityClient = client) => {
        if (!selectedNft) return

        const query = `*[_type == "users"  && walletAddress == "${selectedNft.owner}"] {
  userName
}`

        const OwnerData = await sanityClient.fetch(query)

        await setOwner(OwnerData[0].userName)
    }

    useEffect(() => {
        fetchOwnerData()
    },[owner,selectedNft])


    return (
        <div className={style.wrapper}>
            <div className={style.infoContainer}>
                <div className={style.accent}>Kirby Wonderland</div>
                <div className={style.nftTitle}>{selectedNft?.metadata.name}</div>
                <div className={style.nftDescription}>{selectedNft?.metadata.description}</div>
                <div className={style.otherInfo}>
                    <div className={style.ownedBy}>
                        Owned by <span className={style.accent}>{owner ? owner :selectedNft?.owner}</span>
                    </div>
                    <div className={style.likes}>
                        <AiFillHeart className={style.likeIcon} /> 4.2K favorites
                    </div>
                </div>
            </div>
            <div className={style.actionButtonsContainer}>
                <div className={style.actionButtons}>
                    <div className={`${style.actionButton} ml-2`}>
                        <MdRefresh />
                    </div>
                    <div className={style.divider} />
                    <div className={style.actionButton}>
                        <RiShareBoxLine />
                    </div>
                    <div className={style.divider} />
                    <div className={style.actionButton}>
                        <GiShare />
                    </div>
                    <div className={style.divider} />
                    <div className={`${style.actionButton} mr-2`}>
                        <FiMoreVertical />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GeneralDetails