import Header from '../components/Header'
import Hero from '../components/Hero'
import toast, {Toaster} from 'react-hot-toast'
import Layout from "../components/Layout/Layout";

const style = {
    wrapper: `overflow-hidden`,
    walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#200613] `,
    button: `border border-[#282b2f] bg-[#f7bbcf] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
    details: `text-lg text-center text-white font-semibold mt-4`,
}

export default function Home() {

    return (
        <Layout>
            <div className={style.wrapper}>
                <Toaster position="bottom-left" reverseOrder={false} />
                    <>
                        <Header/>
                        <Hero/>
                    </>
            </div>
        </Layout>
    )
}
