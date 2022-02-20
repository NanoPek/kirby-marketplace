import React from 'react';
import Kirby from '../assets/kirby.png'
import Image from "next/image";
import Link from "next/link";
import {CgProfile} from "react-icons/cg";
const style = {
    wrapper: `relative`,
    container: `before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('../assets/kirby.png')] before:bg-cover before:bg-center before:opacity-30 before:blur`,
    contentWrapper: `flex h-screen relative justify-center flex-wrap items-center`,
    copyContainer: `w-1/2`,
    title: `relative text-[#fdf0f4] text-[46px] font-semibold`,
    description: `text-[#f7bbcf] container-[400px] text-2xl mt-[0.8rem] mb-[2.5rem]`,
    ctaContainer: `flex`,
    accentedButton: ` relative text-lg text-[#200410] font-semibold px-12 py-4 bg-[#f7bbcf] rounded-lg mr-5 text-white hover:bg-[#f9cddb] cursor-pointer`,
    button: ` relative text-lg font-semibold px-12 py-4 bg-[#660c34] rounded-lg mr-5 text-[#fdf0f4] hover:bg-[#780e3d] cursor-pointer`,
    cardContainer: `rounded-[3rem] `,
    infoContainer: `h-20 bg-[#660c34] p-4 rounded-b-lg flex items-center text-white`,
    author: `flex flex-col justify-center ml-4`,
    name: ``,
    infoIcon: `flex justify-end items-center flex-1 text-[#f7bbcf] text-3xl font-bold`,
}

const Hero = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.contentWrapper}>
                    <div className={style.copyContainer}>
                        <div className={style.title}>
                            Discover, collect, and sell extraordinary NFTs
                        </div>
                        <div className={style.description}>
                            Kirby's Marketplace is the world's first and largest NFT marketplace
                        </div>
                        <div className={style.ctaContainer}>
                            <Link href={'/collections/0x0b8faBC9F67027aCfBfd173e74c66FfeBb02315e'}>
                                <button className={style.accentedButton}>Explore</button>
                            </Link>

                            <Link href={'/Profile'}>
                                <button className={style.button}>Edit My Profile</button>
                            </Link>
                        </div>
                    </div>

                        <div className={style.cardContainer}>
                            <Link href={'/collections/0x0b8faBC9F67027aCfBfd173e74c66FfeBb02315e'}>
                                <Image  className={'rounded-t-lg cursor-pointer'} src={Kirby}  />
                            </Link>

                        <div className={style.infoContainer}>
                            <img
                                className={"h-[2.25rem] rounded-full"}
                                src={'https://lh3.googleusercontent.com/u0_GLzm1yPhpRZ-Eh3RouW90lK5mK_CeKsy2380wKt_Pu_20U0W0O2d-uRQy86Q6hGvXahmveFHg7SPIlR1EjwlA_3ZjVLhz67Gu=s0'}
                            />
                            <div className={style.author}>Kirby
                            <a className={'text-[#f7bbcf]'}
                               href={'https://github.com/NanoPek'}>NanoPek</a>
                            </div></div></div>
                    </div>
                </div>
            </div>
    )
}

export default Hero;