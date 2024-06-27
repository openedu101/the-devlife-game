import { magic } from "../lib/magic";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { connectAccountAbstraction } from "../api/WalletAPI";

const Loading = () => (
  <div className="flex flex-col justify-center items-center h-screen">
    <h1>Loading, please wait...</h1>
  </div>
);

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSocialLogin = async () => {
    try {
      await magic.oauth.loginWithRedirect({
        provider: "google",
        redirectURI: new URL("/auth/callback", window.location.origin).href,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleConnect = async () => {
    try {
      console.log("Starting handleConnect");
      const { address, status } = await connectAccountAbstraction();
      console.log("API Response:", { address, status });

      if (address) {
        console.log("Address found:", address);
        navigate("/home", { state: { address } });
        console.log("Navigating to /home with address:", address);
      } else {
        console.log("No address found");
      }
    } catch (err) {
      console.error("Error connecting account:", err);
    }
  };

  const handleSocialLoginAndConnect = async () => {
    try {
      await handleSocialLogin();
    } catch (err) {
      console.error("Error during login and connect:", err);
    }
  };

  useEffect(() => {
    const checkPathAndConnect = async () => {
      if (window.location.pathname === '/auth/callback') {
        setLoading(true);
        try {
          await magic.oauth.getRedirectResult();
          await handleConnect();
        } catch (err) {
          console.error("Error getting redirect result or connecting account:", err);
        } finally {
          setLoading(false);
        }
      }
    };
    checkPathAndConnect();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col items-center mb-20">
        <h1>Welcome to the Devlife Game</h1>
        <button onClick={handleSocialLoginAndConnect}>
          <div className="flex flex-row items-center">
            <FcGoogle size={"2.5rem"} />
            <span className="font-bold ml-2">Log in with Google</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Login;
