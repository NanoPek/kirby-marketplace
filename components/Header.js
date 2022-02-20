import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {AiOutlineSearch} from "react-icons/ai";
import {CgProfile} from "react-icons/cg";
import {MdOutlineAccountBalanceWallet} from "react-icons/md";
import logo from '../assets/logo.png'

const style = {
    wrapper: `bg-[#200410] w-screen px-[1.2rem] py-[0.8rem] flex `,
    logoContainer: `flex items-center cursor-pointer`,
    logoText: ` ml-[0.8rem] text-[#fdf0f4] font-semibold text-2xl`,
    searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-[#660c34] rounded-[0.8rem] hover:bg-[#780e3d]`,
    searchIcon: `text-[#f7bbcf] mx-3 font-bold text-lg`,
    searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#f7bbcf]`,
    headerItems: ` flex items-center justify-end`,
    headerItem: `text-white px-4 font-bold text-[#f9cddb] hover:text-[#fdf0f4] cursor-pointer`,
    headerIcon: `text-[#f7bbcf] text-3xl font-black px-4 hover:text-[#fdf0f4] cursor-pointer`,
}

const Header = () => {
    return <div className={style.wrapper}>
        <Link href={"/"}>
            <div className={style.logoContainer}>
                <Image src={logo} height={40} width={40} />
                <div className={style.logoText}>Kirby's Marketplace</div>
            </div>
        </Link>
        <div className={style.searchBar}>
            <div className={style.searchIcon}>
                <AiOutlineSearch/>
            </div>
            <input className={style.searchInput} placeholder={'Search items, collections, and accounts'}/>
        </div>
        <div className={style.headerItems}>
            <Link href={'/collections/0x0b8faBC9F67027aCfBfd173e74c66FfeBb02315e'}>
                <div className={style.headerItem}> Collections </div>
            </Link>
            <div className={style.headerItem}> Stats </div>
            <div className={style.headerItem}> Resources </div>
            <div className={style.headerItem}> Create </div>
            <div className={style.headerIcon}>
                <Link href={'/Profile'}>
                    <CgProfile/>
                </Link>

            </div>
            <div className={style.headerIcon}>
                <MdOutlineAccountBalanceWallet/>
            </div>
        </div>
    </div>
}

export default Header