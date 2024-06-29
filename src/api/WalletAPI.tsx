import styled from 'styled-components';
import { ethers } from 'ethers';
import 'react-toastify/dist/ReactToastify.css';
import {
  createSmartAccountClient,
  LightSigner,
} from '@biconomy/account';
import { magic } from '../lib/magic';

const StatusText = styled.h1`
  font-family: 'PixelText7';
  font-size: 0.55rem;
`;

type EthereumAddress = string & { __brand: 'EthereumAddress' };

const chains = {
  chainId: 43114,
  name: 'Avalanche (C-Chain)',
  providerUrl: 'https://api.avax.network/ext/bc/C/rpc',
  incrementCountContractAdd: '0x5eeb8342391e9c2dd2a5c14bc71d28c04faadd53',
  biconomyPaymasterApiKey: 'DnIE-WZpb.b4737ab0-0102-42bd-93cc-f0057c9d1111',
  explorerUrl: 'https://subnets.avax.network/c-chain',
};

export const connectAccountAbstraction = async (): Promise<{ address: EthereumAddress | ''; status: string | JSX.Element }> => {
  try {
    // // Nhận kết quả xác thực từ Magic OAuth
    // const result = await magic.oauth.getRedirectResult();
    // console.log("Magic OAuth result:", result);

    // @ts-expect-error - later
    const web3Provider = new ethers.providers.Web3Provider(magic.rpcProvider, "any");

    const config = {
      biconomyPaymasterApiKey: chains.biconomyPaymasterApiKey,
      bundlerUrl: `https://bundler.biconomy.io/api/v2/${chains.chainId}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`,
    };

    const smartWallet = await createSmartAccountClient({
      signer: web3Provider.getSigner() as LightSigner,
      biconomyPaymasterApiKey: config.biconomyPaymasterApiKey,
      bundlerUrl: config.bundlerUrl,
      rpcUrl: chains.providerUrl,
      chainId: chains.chainId,
    });

    const address = (await smartWallet.getAccountAddress()) as EthereumAddress;
    console.log("Smart wallet address:", address);

    return {
      address,
      status: '',
    };
  } catch (err) {
    console.error("Error connecting account abstraction:", err);
    return {
      address: '',
      status: (
        <StatusText>
          {err instanceof Error ? err.message : 'Error message in English'}
        </StatusText>
      ),
    };
  }
};
