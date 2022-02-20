import { useEffect, useState } from 'react'

import { HiTag } from 'react-icons/hi'
import { IoMdWallet } from 'react-icons/io'
import toast, { Toaster } from 'react-hot-toast'
import {list} from "postcss";
import {useWeb3} from "@3rdweb/hooks";

const style = {
    button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer`,
    buttonIcon: `text-xl`,
    buttonIconWallet: `text-xl text-[#200410]`,
    buttonText: `ml-2 text-lg font-semibold`,
    buttonTextBuy: `ml-2 text-lg font-semibold text-[#200410]`,
}

const MakeOffer = ({isListed,selectedNft,listings,marketPlaceModule}) => {
    const [selectedMarketNft, setSelectedMarketNft] = useState()
    const [enableButton, setEnableButton] = useState(false)
    const [error, setError] = useState(false)
    const {address, connectWallet} = useWeb3()


    useEffect(() => {
        if (!listings || isListed === 'false') return
            ;(async () => {
            setSelectedMarketNft(
                listings.find((marketNft) => marketNft.asset?.id === selectedNft.metadata.id)
            )

        })()

    }, [selectedNft, listings, isListed])

    useEffect(() => {
        if (!selectedMarketNft || !selectedNft) return


        setEnableButton(true)
    }, [selectedMarketNft, selectedNft])

    const confirmPurchase = (toastHandler = toast) =>
        toastHandler.success(`Purchase successful!`, {
            style: {
                background: '#200410',
                color: '#fff',
            },
        })

    const errorPurchase = (toastHandler = toast) =>
        toastHandler.error(`Purchase failed!`, {
            style: {
                background: '#200410',
                color: '#fff',
            },
        })

    const buyItem = async (
        listingId = selectedMarketNft.id,
        quantityDesired = 1,
        module = marketPlaceModule
    ) => {

        await module
            .buyoutDirectListing({
                listingId: listingId,
                quantityDesired: quantityDesired,
            })
            .catch((error) => onError(error)).then(confirmCheck)



    }
    const confirmCheck = () => {
        if (selectedNft.owner === address) {
            confirmPurchase()
        }
    }
    const onError = (error) => {
        console.error(error)
        errorPurchase()
        setError(true)
    }
    return (
        <div className="flex h-20 w-full items-center rounded-lg border border-[#151c22] bg-[#303339] px-12">
            <Toaster position="bottom-left" reverseOrder={false} />
            {isListed === 'true' ? (
                <>
                    <div
                        onClick={() => {
                            enableButton ? buyItem(selectedMarketNft.id, 1) : null
                        }}
                        className={`${style.button} bg-[#f7bbcf] hover:bg-[#f9cddb]`}
                    >
                        <IoMdWallet className={style.buttonIconWallet} />
                        <div className={style.buttonTextBuy}>Buy Now</div>
                    </div>
                    <div
                        className={`${style.button} bg-[#660c34] hover:bg-[#780e34]`}
                    >
                        <HiTag className={style.buttonIcon} />
                        <div className={style.buttonText}>Make Offer</div>
                    </div>
                </>
            ) : (
                <div className={`${style.button} bg-[#f7bbcf] hover:bg-[#f9cddb]`}>
                    <IoMdWallet className={style.buttonIconWallet} />
                    <div className={style.buttonTextBuy}>List Item</div>
                </div>
            )}
        </div>
    )
}
export default MakeOffer