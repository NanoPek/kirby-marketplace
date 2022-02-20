import Layout from "../components/Layout/Layout";
import Header from "../components/Header";
import React, {useEffect, useState} from "react";
import {useWeb3} from "@3rdweb/hooks";
import {client} from "../lib/sanityClient";
import {AiOutlineGithub, AiOutlineTwitter, AiFillEdit, AiFillSave} from "react-icons/ai";
import {BsFillTrashFill} from "react-icons/bs";
import Image from "next/image";
import toast, {Toaster} from "react-hot-toast";

const Profile = () => {

    const { address} = useWeb3();
    const [profile, setProfile] = useState()
    const [edit, setEdit] = useState(false)
    const [username, setUsername] = useState('your Username')
    const [twitterUsername, setTwitterUsername] = useState('your Twitter Username')
    const [githubUsername, setGithubUsername] = useState('your Github Username')
    const [bannerImage, setBannerImage] = useState()
    const [profileImage, setProfileImage] = useState()
    const [bannerImageChanged, setBannerImageChanged] = useState(false)
    const [profileImageChanged, setProfileImageChanged] = useState(false)
    const [infoChanged, setInfoChanged] = useState(false)


    const profileImageToast = (toastHandler = toast) => {
        toastHandler.success(
            `Profile image successfully changed ! `,
            {
                style: {
                    background: '#200410',
                    color: '#fff'
                }
            }
        )
    }

    const bannerImageToast = (toastHandler = toast) => {
        toastHandler.success(
            `Banner image successfully changed ! `,
            {
                style: {
                    background: '#200410',
                    color: '#fff'
                }
            }
        )
    }

    const infoToast = (toastHandler = toast) => {
        toastHandler.success(
            `User infos successfully saved ! `,
            {
                style: {
                    background: '#200410',
                    color: '#fff'
                }
            }
        )
    }



    useEffect(() => {

    },[])



    const enableEdit = () => {
        setEdit(!edit)
    }



    const save = async () => {
        await (async () => {
            if (bannerImageChanged || profileImageChanged) {

                var file = document.querySelector('#file-input').files[0];
                var file2 = document.querySelector('#file-input-profile').files[0];

                function getBase64(file) {
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = error => reject(error);
                    });
                }

                async function sendToAPI(data) {
                    const callback = await client.patch(profile._id).set({
                        banner64: data

                    }).commit()

                    bannerImageToast()
                }

                async function sendToAPIProfile(data) {
                    const callback = await client.patch(profile._id).set({
                        profile64: data

                    }).commit()

                    profileImageToast()
                }

                async function asyncCall() {
                    if (file) {
                        console.log("banner Image modified !")
                        const data = await getBase64(file)

                        const rep = await sendToAPI(data)
                    }
                    if (file2) {
                        console.log("Profile Image modified !")
                        const data = await getBase64(file2)

                        const rep = await sendToAPIProfile(data)
                    }

                }

            }

            asyncCall().then(fetchProfileData)

            if (infoChanged) {
                await (async () => {

                    const callback = await client.patch(profile._id).set({
                        twitterHandle: twitterUsername,
                        igHandle: githubUsername,
                        userName: username
                    }).commit()

                    infoToast()


                })().then(fetchProfileData)

            }
        })()
        setEdit(!edit)

    }

    const fetchProfileData = async (sanityClient = client) => {

        const query = `*[_type == "users"  && walletAddress == "${address}"] {
      userName,
      twitterHandle,
      igHandle,
      _createdAt,
      profile64,
      _id,
      banner64,
    }`

        const profileData = await sanityClient.fetch(query)

        await setProfile(profileData[0])
    }

    useEffect(() => {
        if (!profile) return

        setUsername(profile.userName)
        setTwitterUsername(profile.twitterHandle)
        setGithubUsername(profile.igHandle)
        setBannerImage(profile.banner64)
        setProfileImage(profile.profile64)


    },[profile])

    useEffect(() => {
        fetchProfileData()
    },[address])
    useEffect(() => {
        if (edit && !bannerImageChanged) {
            setBannerImageChanged(true)
        }
    },[bannerImage])

    useEffect(() => {
        if (edit && !profileImageChanged) {
            setProfileImageChanged(true)
        }
    },[profileImage])

    useEffect(() => {
        if (edit && !infoChanged) {
            setInfoChanged(true)
        }
    },[twitterUsername,githubUsername,username])


    const style = {
        bannerImageContainer: "h-[30vh] w-screen overflow-hidden flex justify-center items-center relative ",
        bannerImage: "w-full object-cover",
        wrapper: "bg-indigo-500 w-1/2 flex flex-col justify-center items-center py-6",
        infoContainer: `w-screen px-4`,
        midRow: `w-full flex justify-center text-white `,
        profileImg: `w-60 h-60 object-cover rounded-full border-2 border-[#202225] mt-[-4rem] relative `,
        userName: `text-5xl font-bold mb-4`,
        createdWhen: `text-lg mb-4 flex flex-row`,
        socialsContainer: `flex flex-col justify-between items-center py-2 border border-[#151b22] rounded-xl px-8`,
        socialContainer: `text-xl font-bold w-full flex items-center justify-center my-4`,
        editButton: `flex justify-center items-center w-32 py-2 rounded-lg cursor-pointer my-4 mx-1 text-[#200410]`,
        buttonText: `ml-2 text-lg font-semibold `,
        input: `h-[2.6rem] w-full border-0 bg-[#000] bg-opacity-30 rounded-lg outline-0 ring-0 px-2 pl-0 text-[#fff] `,
        inputUsername: `h-[4.2rem] w-full border-0 bg-[#000] bg-opacity-30 rounded-lg outline-0 ring-0 px-2 pl-0 text-center text-[#fff] text-5xl font-bold mb-4`,





    }


    return (
        <Layout>
            <div >
                <Toaster position="bottom-left" reverseOrder={false} />
                <Header/>
                {!edit ?
                    <>
                    <div className={style.bannerImageContainer}>
                        <Image className={style.bannerImage}
                             src={profile ? profile.banner64  ? profile.banner64 : 'https://via.placeholder.com/200' : 'https://via.placeholder.com/200' }
                               layout={"fill"}
                             alt={"banner"}/>
                    </div>
                    <div className={style.infoContainer}>
                        <div className={style.midRow}>
                            <div className={style.profileImg}>
                                <Image className={style.profileImg}
                                       src={profile ? profile.profile64  ? profile.profile64 : 'https://via.placeholder.com/200' : 'https://via.placeholder.com/200' }
                                       layout={"fill"}
                                       alt={"banner"}/>
                            </div>
                        </div>
                        <div className={style.midRow}>
                            <div className={style.userName}>{profile?.userName}</div>
                        </div>
                        <div className={style.midRow}>
                            <div className={style.createdWhen} >
                                Joined&nbsp;
                                <div className={"text-[#f7bbcf]"}>
                                    {profile?._createdAt.slice(0,7)}
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                    :
                    <>
                        <div className={style.bannerImageContainer}>
                            <label for={"file-input"} className={'cursor-pointer'}>
                                <Image className={style.bannerImage}
                                       src={profile ? profile.banner64  ? profile.banner64 : 'https://via.placeholder.com/200' : 'https://via.placeholder.com/200'}
                                       layout={"fill"}
                                       alt={"banner"}/>
                            </label>
                            <input id="file-input" className={"hidden"} type="file" accept="image/*" onChange={evt => setBannerImage(evt.target.value)}/>
                        </div>
                        <div className={style.infoContainer}>
                            <div className={style.midRow}>
                                <label for={'file-input-profile'} className={'cursor-pointer'}>
                                    <div className={style.profileImg}>
                                        <Image className={style.profileImg}
                                               src={profile ? profile.profile64  ? profile.profile64 : 'https://via.placeholder.com/200' : 'https://via.placeholder.com/200' }
                                               layout={"fill"}
                                               alt={"banner"}/>
                                    </div>
                                </label>
                                <input id="file-input-profile" className={"hidden"} type="file" accept="image/*" onChange={evt => setProfileImage(evt.target.value)}/>


                            </div>
                            <div className={style.midRow}>
                                <input className={style.inputUsername} value={username} onChange={evt => setUsername(evt.target.value)} />
                            </div>
                            <div className={style.midRow}>
                                <div className={style.createdWhen} >
                                    Joined&nbsp;
                                    <div className={"text-[#f7bbcf]"}>
                                        {profile?._createdAt.slice(0,7)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }

                    { !edit ?
                        <div className={style.midRow}>
                            <button className={`${style.editButton} bg-[#f7bbcf] text-[#200410] hover:bg-[#f9cddb]`} onClick={enableEdit}>
                                <AiFillEdit/>
                                <div className={style.buttonText} >Edit Profile</div>
                            </button>
                        </div> :

                        <div className={style.midRow}>
                            <button className={`${style.editButton} bg-[#1ecd97] text-[#fff] hover:bg-[#21dea4]`} onClick={save}>
                                <AiFillSave/>
                                <div className={style.buttonText} >Save</div>
                            </button>
                            <button className={`${style.editButton} bg-[#eb5160] text-[#fff] hover:bg-[#ed6370]`} onClick={enableEdit}>
                                <BsFillTrashFill/>
                                <div className={style.buttonText} >Cancel</div>
                            </button>
                        </div>
                    }
                    {!edit ?
                        <div className={style.midRow}>
                            <div className={style.socialsContainer}>
                                <div className={style.socialContainer}>
                                    <AiOutlineTwitter/>
                                    &nbsp;Twitter account :&nbsp;
                                    {profile?.twitterHandle}
                                </div>
                                <div className={style.socialContainer}>
                                    <AiOutlineGithub/>
                                    &nbsp;Github account :&nbsp;
                                    {profile?.igHandle}
                                </div>
                            </div>
                        </div> :
                        <div className={style.midRow}>
                            <div className={style.socialsContainer}>
                                <div className={style.socialContainer}>
                                    <AiOutlineTwitter/>
                                    &nbsp;Twitter account :&nbsp;
                                    <input className={style.input} value={twitterUsername} onChange={evt => setTwitterUsername(evt.target.value)} />
                                </div>
                                <div className={style.socialContainer}>
                                    <AiOutlineGithub/>
                                    &nbsp;Github account :&nbsp;
                                    <input className={style.input} value={githubUsername} onChange={evt => setGithubUsername(evt.target.value)}/>
                                </div>
                            </div>
                        </div>
                    }
                    </div>
        </Layout>
    )
}

export default Profile