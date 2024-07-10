import { useEffect, useState } from "react";
import { createUser } from "../api/socket-and-server-api";
import { walletCopy, walletCopyPL } from "../data/WalletData";
import Header from "../components/Header";
import { AuthContextData, useAuth } from "../contexts/AuthProvider";
import { SERVER_URL } from "../constants";
import { connectAccountAbstraction } from "../api/WalletAPI";
import { useLocation } from "react-router-dom";
import { RedirectResult } from "../types";
import Knowledge from "../components/Knowledge";
import SubKnowledge from "../components/SubKnowledge";
import { BiconomySmartAccountV2 } from "@biconomy/account"; // Added this line
import eruda from 'eruda'

eruda.init()

function Home() {
  const { redirectResult, setRedirectResult } =
    useAuth() as AuthContextData;

  const location = useLocation();
  const { address: initialAddress } = location.state || {};
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    const savedAddress = localStorage.getItem("address");
    setAddress(savedAddress || initialAddress || "");
  }, [initialAddress]);

  const [loading, setLoading] = useState(false);

  const [, setShowConfigurator] = useState(false);
  const [, setShowDisclosure] = useState(false);
  const [language, setLanguage] = useState("english");
  // const [publicAddress, setPublicAddress] = useState('');
  // const [smartAccount, setSmartAccount] = useState(null);

  const [smartWallet, setSmartWallet] = useState<BiconomySmartAccountV2 | null>(null); // Changed this line



  // load redirectResult from localStorage
  useEffect(() => {
    const redirectResultJson = localStorage.getItem("redirectResult");
    if (redirectResultJson) {
      setRedirectResult(JSON.parse(redirectResultJson));
    }
  }, [setRedirectResult]);

  const handleReturnToStartPage = () => {
    setShowConfigurator(false);
    setShowDisclosure(false);
  };

  const handleLanguageChange = () => {
    setLanguage(language === "english" ? "vietnamese" : "english");
  };

  // HANDLE LOGIN
  useEffect(() => {

    // check if create user or not
    async function checkUserExist() {
      const resp = await fetch(`${SERVER_URL}/get_user_by_email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: redirectResult?.oauth.userInfo.email,
          // email: "letung678978@gmail.com",
        }),
      });

      const data = await resp.json();


      if (data.StatusCode == 404) {
        const { address: connectedAddress, smartWallet } = await connectAccountAbstraction();
        await createUser(redirectResult as RedirectResult, connectedAddress);

        if (smartWallet) {
          setSmartWallet(smartWallet);
        }


      }
    }
    checkUserExist();
  }, []);

  useEffect(() => {
    const connectWallet = async () => {
      setLoading(true);
      try {
        const { address: connectedAddress, smartWallet } = await connectAccountAbstraction();
        setAddress(connectedAddress);
        if (smartWallet) {
          setSmartWallet(smartWallet);
        }
      } catch (err) {
        console.error("Error connecting wallet:", err);
      } finally {
        setLoading(false);
      }
    };
    if (!address) {
      connectWallet();
    }
  }, [address]);

  if (loading) {
    return (
      <>
        <div className="w-full mx-auto p-4 min-h-screen">
          <Header
            onLeftButtonClick={handleReturnToStartPage}
            onLanguageChange={handleLanguageChange}
            data={language === "english" ? walletCopy : walletCopyPL}
            language={language}
            publicAddress={address}
          />

          <div className="sm:flex-col flex mt-4 gap-2 w-full">
            

            <Knowledge address={address}/>

            <div className="w-1/3 p-2 nes-container bg-[#7e56f3] rounded-[24px] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center text-white mb-2">
                  <div>SUB-KNOWLEDGE</div>
                </div>
                <div className="p-2">
                  <div className="nes-balloon from-left nes-pointer p-2">
                    <div className="cursor-pointer">
                      <div className="text-red-500">Introduction</div>
                      <div className="text-black">
                        This game was designed to help you fun with the
                        hackathon concepts and learn more what blockchain is?
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <div className="nes-balloon from-left nes-pointer p-2">
                    <div className="cursor-pointer">
                      <div className="text-red-500">
                        How the game help you understand blockchain?
                      </div>
                      <div className="text-black">
                        We focus on providing insights into the Avax network.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* max-w-6xl */}
      <div className="w-full mx-auto p-4 min-h-screen">
        <Header
          onLeftButtonClick={handleReturnToStartPage}
          onLanguageChange={handleLanguageChange}
          data={language === "english" ? walletCopy : walletCopyPL}
          language={language}
          publicAddress={address}
        />

        <div className="sm:flex-col flex mt-4 gap-2">
          


          <Knowledge address={address} smartWallet={smartWallet || undefined}/>
          <SubKnowledge/>

        </div>
      </div>
    </>
  );
}

export default Home;
