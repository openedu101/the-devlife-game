import { useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { socket } from "./socket";
import { useDevicePixelRatio } from "./hooks/useDevicePixelRatio";
import { useScreen } from "./hooks/useScreen";
import { updateDataDev } from "./api";
import { SocketServerEvents } from "./enums";
import ConnectLocks from "./layout/ConnectLocks";

function App() {
  const {
    unityProvider,
    loadingProgression,
    isLoaded,
    sendMessage,
    addEventListener,
    removeEventListener,
  } = useUnityContext({
    loaderUrl: "build/Build/BuildLiveDev.loader.js",
    dataUrl: "build/Build/BuildLiveDev.data",
    frameworkUrl: "build/Build/BuildLiveDev.framework.js",
    codeUrl: "build/Build/BuildLiveDev.wasm",
  });

  const devicePixelRatio = useDevicePixelRatio();
  const { screenSize, isLargeScreen } = useScreen();

  useEffect(() => {
    // @ts-expect-error - TS doesn't know about the "UpdateDataDev" event
    addEventListener("UpdateDataDev", updateDataDev);
    return () => {
      // @ts-expect-error - TS doesn't know about the "UpdateDataDev" event
      removeEventListener("UpdateDataDev", updateDataDev);
    };
  }, [addEventListener, removeEventListener]);

  useEffect(() => {
    function onUpdateTeam(data: string) {
      // console.log("onUpdateTeam");
      // console.log(data);
      sendMessage("PlayerControll", "receiveJsonTeam", JSON.stringify(data));
    }

    socket.on(SocketServerEvents.UpdateTeam, onUpdateTeam);

    return () => {
      socket.off(SocketServerEvents.UpdateTeam, onUpdateTeam);
    };
  }, [sendMessage]);

  useEffect(() => {
    const data = {
      team: {
        name: "Weminal",
        quantity: 4,
        total_token: 100,
        total_commit: 100,
        total_bug: 100,
      },
      users: [
        {
          id: 1,
          name: "Hien",
          stamina: 100,
          is_online: true,
        },
        {
          id: 2,
          name: "Phuc",
          stamina: 100,
          is_online: true,
        },
        {
          id: 3,
          name: "Phap",
          stamina: 100,
          is_online: true,
        },
        {
          id: 4,
          name: "Tung",
          stamina: 100,
          is_online: true,
        },
      ],
      id_user_playing: 1,
    };
    sendMessage("PlayerControll", "receiveJsonTeam", JSON.stringify(data));
  }, [isLoaded, sendMessage]);

  return (
    <>
      {/* max-w-6xl */}
      <div className="w-full mx-auto p-4 min-h-screen">
        <div className="flex justify-between items-center orange-bg p-2">
          <div className="text-white">Dora THE GAME</div>
          <div className="flex items-center">
            <div className="mx-2">
              <i className="fas fa-cog text-white"></i>
            </div>
            <div className="mx-2">
              <i className="fas fa-save text-white"></i>
            </div>
            <div className="mx-2">
              <i className="fas fa-trophy text-white"></i>
            </div>
            <div className="mx-2">
              <i className="fas fa-user-secret text-white"></i>
            </div>
            <div className="mx-2">
              <i className="fas fa-chart-line text-white"></i>
            </div>
            <div className="mx-2">
              <i className="fas fa-book text-white"></i>
            </div>
          </div>
        </div>

        <div className="sm:flex-col flex mt-4">
          <div className="sm:w-full w-1/2 p-2 dark-bg">
            <div className="flex justify-center items-center border-orange">
              {!isLoaded && (
                <p>
                  Loading Application... {Math.round(loadingProgression * 100)}%
                </p>
              )}
              <Unity
                unityProvider={unityProvider}
                style={{
                  // visibility: isLoaded ? "visible" : "hidden",
                  display: isLoaded ? "block" : "none",
                  width: `${
                    !isLargeScreen
                      ? screenSize.width / screenSize.height > 1 // rotate phone
                        ? screenSize.width
                        : screenSize.width - 50
                      : screenSize.width / 2.13
                  }px`,
                  height: `${
                    !isLargeScreen
                      ? screenSize.width / screenSize.height > 1 // rotate phone
                        ? screenSize.height - 70
                        : screenSize.height - 100
                      : screenSize.height / 1.6
                  }px`,
                }}
                devicePixelRatio={devicePixelRatio}
              />
            </div>
            {/* CONNECT */}
            <ConnectLocks />
          </div>

          <div className="sm:mb-5 sm:mt-5 sm:w-full w-1/4 p-2 dark-bg">
            <div className="flex justify-between items-center text-white mb-2">
              <div>KNOWLEDGE</div>
              <div>1/NA</div>
            </div>
            <div className="light-bg p-2">
              {/* <div className="text-white">8/21 BTC</div> */}
              <div className="text-white cursor-pointer">Prerequisites</div>
              {/* <div className="flex items-center justify-between text-white">
                <div>
                  <i className="fas fa-clock"></i> +32/s
                </div>
                <div>
                  <i className="fas fa-coins"></i> +8.37K
                </div>
              </div> */}
            </div>
          </div>

          <div className="sm:w-full w-1/4 dark-bg">
            <div className="text-white p-2">SUB-KNOWLEDGE</div>
            <div className=" p-2 dark-bg">
              <div className="light-bg p-2">
                <div>
                  <div className="cursor-pointer">
                    <div>Introduction</div>
                    <div className="text-white">
                      This game was designed to help you fun with the hackathon
                      concepts and learn more what blockchain is?
                    </div>
                  </div>
                  {/* <div className="flex items-center justify-between text-white">
                  <div>
                    <i className="fas fa-tachometer-alt"></i> +60/s
                  </div>
                  <div>
                    <i className="fas fa-minus-circle text-red-500"></i> -12K
                  </div>
                </div> */}
                </div>
                {/* <div>
                <div className="text-white">Income VP</div>
                <div className="flex items-center justify-between text-white">
                  <div>
                    <i className="fas fa-dollar-sign"></i> +10%/s
                  </div>
                  <div>
                    <i className="fas fa-minus-circle text-red-500"></i> -30K
                  </div>
                </div>
              </div>
              <div>
                <div className="text-white">Growth Hacker</div>
                <div className="flex items-center justify-between text-white">
                  <div>
                    <i className="fas fa-hand-pointer"></i> +200/Click
                  </div>
                  <div>
                    <i className="fas fa-plus-circle text-green-500"></i> +600/s
                  </div>
                </div>
              </div>
              <div>
                <div className="text-white">ZK Engineer</div>
                <div className="flex items-center justify-between text-white">
                  <div>
                    <i className="fas fa-cogs"></i> +800/s
                  </div>
                  <div>
                    <i className="fas fa-minus-circle text-red-500"></i> -100K
                  </div>
                </div>
              </div> */}
              </div>
            </div>
            <div className="p-2 dark-bg">
              <div className="light-bg p-2">
                <div className="cursor-pointer">
                  <div>How the game help you understand blockchain?</div>
                  <div className="text-white">
                    We focus on providing insights into the Avax network.
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

export default App;
