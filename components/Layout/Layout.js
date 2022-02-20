import React, {useEffect} from 'react';
import {useWeb3} from "@3rdweb/hooks";
import toast from "react-hot-toast";
import {client} from "../../lib/sanityClient";
import Head from "next/head"

const Layout =({children}) =>{

    const style = {
        wrapper: `overflow-hidden`,
        walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#200613] `,
        button: `border border-[#282b2f] bg-[#f7bbcf] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
        details: `text-lg text-center text-white font-semibold mt-4`,
    }

    const {address, connectWallet} = useWeb3()

    const welcomeUser = (userName, toastHandler = toast) => {
        toastHandler.success(
            `Welcome back${userName !== 'Unnamed' ? ` ${userName}` : ''}!`,
            {
                style: {
                    background: '#200410',
                    color: '#fff'
                }
            }
        )
    }

    useEffect(() => {
        if (!address) return
            ;(async () => {
            const userDoc = {
                _type: 'users',
                _id: address,
                userName: address,
                walletAddress: address,
            }
            const result = await client.createIfNotExists(userDoc)

            welcomeUser(result.userName)
        })()
    }, [address])

    return(
        <>
            <Head>
                <title>Kirby's Marketplace</title>
            </Head>
            {address ? (
                <main>{children}</main>
            ) : (
                <div className={style.walletConnectWrapper}>
                    <button className={style.button} onClick={() => connectWallet('injected')}>
                        Connect Metamask Wallet on Rinkeby Testnet
                    </button>
                    <div className={style.details}>
                        You need Chrome to be
                        <br/> able to run this app.
                    </div>
                </div>
            )}
        </>
    )
}

export default Layout;