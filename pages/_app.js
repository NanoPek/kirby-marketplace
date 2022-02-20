import '../styles/globals.css'
import {ThirdwebWeb3Provider, useWeb3} from '@3rdweb/hooks'
import Header from "../components/Header";
import Hero from "../components/Hero";
import toast from "react-hot-toast";
import {useEffect} from "react";
import {client} from "../lib/sanityClient";

const supportedChainIds = [4]
const connectors = {
  injected: {},
}

function MyApp({ Component, pageProps }) {





  return (
      <ThirdwebWeb3Provider connectors={connectors} supportedChainIds={supportedChainIds}>
              <Component {...pageProps} />
      </ThirdwebWeb3Provider>
  )
}

export default MyApp
