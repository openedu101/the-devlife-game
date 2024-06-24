import { useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import ConnectLocks from "./layout/ConnectLocks";

function App() {
  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: "build/Build/BuildLiveDev.loader.js",
    dataUrl: "build/Build/BuildLiveDev.data.br",
    frameworkUrl: "build/Build/BuildLiveDev.framework.js.br",
    codeUrl: "build/Build/BuildLiveDev.wasm.br",
  });

  // We'll use a state to store the device pixel ratio.
  const [devicePixelRatio, setDevicePixelRatio] = useState(
    window.devicePixelRatio
  );

  console.log("devicePixelRatio", devicePixelRatio);

  useEffect(
    function () {
      // A function which will update the device pixel ratio of the Unity
      // Application to match the device pixel ratio of the browser.
      const updateDevicePixelRatio = function () {
        setDevicePixelRatio(window.devicePixelRatio);
      };
      // A media matcher which watches for changes in the device pixel ratio.
      const mediaMatcher = window.matchMedia(
        `screen and (resolution: ${devicePixelRatio}dppx)`
      );
      // Adding an event listener to the media matcher which will update the
      // device pixel ratio of the Unity Application when the device pixel
      // ratio changes.
      mediaMatcher.addEventListener("change", updateDevicePixelRatio);
      return function () {
        // Removing the event listener when the component unmounts.
        mediaMatcher.removeEventListener("change", updateDevicePixelRatio);
      };
    },
    [devicePixelRatio]
  );

  return (
    <>
      {/* max-w-6xl */}
      <div className="w-full mx-auto p-4 h-screen">
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

        <div className="flex mt-4">
          <div className="w-1/2 p-2 dark-bg">
            <div className="flex justify-center items-center p-4 border-orange">
              {!isLoaded && (
                <p className="">
                  Loading Application... {Math.round(loadingProgression * 100)}%
                </p>
              )}
              <Unity
                unityProvider={unityProvider}
                style={{
                  visibility: isLoaded ? "visible" : "hidden",
                  width: "900px",
                  height: "600px",
                }}
                devicePixelRatio={devicePixelRatio}
              />
              {/* <button className="bg-green-500 text-white font-bold py-2 px-4 rounded">
                  BUILD
                </button> */}
            </div>
            {/* CONNECT */}
            <ConnectLocks />
          </div>

          <div className="w-1/4 p-2 dark-bg">
            <div className="flex justify-between items-center text-white mb-2">
              <div>PROJECT</div>
              <div>39/149</div>
            </div>
            <div className="light-bg p-2">
              <div className="text-white">8/21 BTC</div>
              <div className="text-white">
                Bitcoin-QT v0.6, adding QR codes for addresses, an
                implementation of BIP30 and fixes for memory related
                denial-of-service attacks.
              </div>
              <div className="flex items-center justify-between text-white">
                <div>
                  <i className="fas fa-clock"></i> +32/s
                </div>
                <div>
                  <i className="fas fa-coins"></i> +8.37K
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/4 p-2 dark-bg">
            <div className="text-white mb-2">HACKER</div>
            <div className="light-bg p-2">
              <div className="text-white">Cryptography guru</div>
              <div className="flex items-center justify-between text-white">
                <div>
                  <i className="fas fa-tachometer-alt"></i> +60/s
                </div>
                <div>
                  <i className="fas fa-minus-circle text-red-500"></i> -12K
                </div>
              </div>
              <div className="text-white">Income VP</div>
              <div className="flex items-center justify-between text-white">
                <div>
                  <i className="fas fa-dollar-sign"></i> +10%/s
                </div>
                <div>
                  <i className="fas fa-minus-circle text-red-500"></i> -30K
                </div>
              </div>
              <div className="text-white">Growth Hacker</div>
              <div className="flex items-center justify-between text-white">
                <div>
                  <i className="fas fa-hand-pointer"></i> +200/Click
                </div>
                <div>
                  <i className="fas fa-plus-circle text-green-500"></i> +600/s
                </div>
              </div>
              <div className="text-white">ZK Engineer</div>
              <div className="flex items-center justify-between text-white">
                <div>
                  <i className="fas fa-cogs"></i> +800/s
                </div>
                <div>
                  <i className="fas fa-minus-circle text-red-500"></i> -100K
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
