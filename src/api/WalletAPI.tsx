import React, { useState } from "react";
import {
  createSmartAccountClient,
  BiconomySmartAccountV2,
  PaymasterMode,
} from "@biconomy/account";
import { ethers } from "ethers";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import styled from 'styled-components';
import { walletCopy, walletCopyPL } from "../data/WalletData";

const StatusText = styled.h1`
  font-family: 'PixelText7';
  font-size: 0.55rem;
`;

type EthereumAddress = string & { __brand: "EthereumAddress" };

const chains = [
  {
    chainId: 11155111,
    name: "Ethereum Sepolia",
    providerUrl: "https://eth-sepolia.public.blastapi.io",
    incrementCountContractAdd: "0xd9ea570eF1378D7B52887cE0342721E164062f5f",
    biconomyPaymasterApiKey: "gJdVIBMSe.f6cc87ea-e351-449d-9736-c04c6fab56a2",
    explorerUrl: "https://sepolia.etherscan.io/tx/",
  },
  {
    chainId: 80002,
    name: "Polygon Amoy",
    providerUrl: "https://rpc-amoy.polygon.technology/",
    incrementCountContractAdd: "0xfeec89eC2afD503FF359487967D02285f7DaA9aD",
    biconomyPaymasterApiKey: "TVDdBH-yz.5040805f-d795-4078-9fd1-b668b8817642",
    explorerUrl: "https://www.oklink.com/amoy/tx/",
  },
];

export const getCurrentWalletConnected = async (language: string) => {
  try {
    const chainSelected = 0; // Select chain, 0 for Ethereum Sepolia, 1 for Polygon Amoy
    const chainConfig =
      chainSelected == 0
        ? {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0xaa36a7",
            rpcTarget: chains[chainSelected].providerUrl,
            displayName: "Ethereum Sepolia",
            blockExplorer: "https://sepolia.etherscan.io/",
            ticker: "ETH",
            tickerName: "Ethereum",
          }
        : {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x13882",
            rpcTarget: chains[chainSelected].providerUrl,
            displayName: "Polygon Amoy",
            blockExplorer: "https://www.oklink.com/amoy/",
            ticker: "MATIC",
            tickerName: "Polygon Matic",
          };

    const web3auth = new Web3Auth({
      clientId: "BCptdW933DAWlCBDnmTNX63JQ9h-zo_evDNZVl1CQdBiyvud7i5egQYSL3U-kE6PHMSiLoTfSRoO3jD1lbrGcvM", 
      web3AuthNetwork: "sapphire_devnet",
      chainConfig,
      uiConfig: {
        appName: "Biconomy X Web3Auth",
        mode: "dark",
        loginMethodsOrder: ["apple", "google", "twitter"],
        logoLight: "https://web3auth.io/images/web3auth-logo.svg",
        logoDark: "https://web3auth.io/images/web3auth-logo---Dark.svg",
        defaultLanguage: "en",
        loginGridCol: 3,
        primaryButton: "socialLogin",
      },
    });

    await web3auth.initModal();
    const web3authProvider = await web3auth.connect();
    const ethersProvider = new ethers.providers.Web3Provider(web3authProvider as any);
    const web3AuthSigner = ethersProvider.getSigner();

    const address = await web3AuthSigner.getAddress() as EthereumAddress;
    return {
      address,
      status: "",
    };
  } catch (err) {
    return {
      address: "",
      status: (
        <StatusText>
          {language === "english"
            ? `${err instanceof Error ? err.message : walletCopy.errorMessage}`
            : `${err instanceof Error ? err.message : walletCopyPL.errorMessage}`}
        </StatusText>
      ),
    };
  }
};

export const connectWallet = async (language: string): Promise<{ address: EthereumAddress | ""; status: string | JSX.Element }> => {
  try {
    const chainSelected = 0; // Select chain, 0 for Ethereum Sepolia, 1 for Polygon Amoy
    const chainConfig =
      chainSelected == 0
        ? {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0xaa36a7",
            rpcTarget: chains[chainSelected].providerUrl,
            displayName: "Ethereum Sepolia",
            blockExplorer: "https://sepolia.etherscan.io/",
            ticker: "ETH",
            tickerName: "Ethereum",
          }
        : {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x13882",
            rpcTarget: chains[chainSelected].providerUrl,
            displayName: "Polygon Amoy",
            blockExplorer: "https://www.oklink.com/amoy/",
            ticker: "MATIC",
            tickerName: "Polygon Matic",
          };

    const web3auth = new Web3Auth({
      clientId: "BCptdW933DAWlCBDnmTNX63JQ9h-zo_evDNZVl1CQdBiyvud7i5egQYSL3U-kE6PHMSiLoTfSRoO3jD1lbrGcvM", 
      web3AuthNetwork: "sapphire_devnet",
      chainConfig,
      uiConfig: {
        appName: "Biconomy X Web3Auth",
        mode: "dark",
        loginMethodsOrder: ["apple", "google", "twitter"],
        logoLight: "https://web3auth.io/images/web3auth-logo.svg",
        logoDark: "https://web3auth.io/images/web3auth-logo---Dark.svg",
        defaultLanguage: "en",
        loginGridCol: 3,
        primaryButton: "socialLogin",
      },
    });

    await web3auth.initModal();
    const web3authProvider = await web3auth.connect();
    const ethersProvider = new ethers.providers.Web3Provider(web3authProvider as any);
    const web3AuthSigner = ethersProvider.getSigner();

    const address = await web3AuthSigner.getAddress() as EthereumAddress;
    return {
      status: "",
      address,
    };
  } catch (err) {
    return {
      address: "",
      status: (
        <StatusText>
          {language === "english"
            ? `${err instanceof Error ? err.message : walletCopy.errorMessage}`
            : `${err instanceof Error ? err.message : walletCopyPL.errorMessage}`}
        </StatusText>
      ),
    };
  }
};
