import React from 'react';
import { Hex, encodeFunctionData } from "viem";
import { realbuilderSBTabi } from "../../abi/RealBuilderSBT";
import { BiconomySmartAccountV2, PaymasterMode, SponsorUserOperationDto, createPaymaster } from "@biconomy/account";

interface FireworksProps {
  role: string;
  roleImage: string;
  onClaim: () => void;
  smartWallet?: BiconomySmartAccountV2;
  address?: string;
}

const Fireworks: React.FC<FireworksProps> = ({ role, roleImage, smartWallet, address, onClaim }) => {

  const handleClaim = async () => {
    if (!smartWallet || !address) {
      onClaim();
      return;
    }

    const nftAddress = "0xb1f798Ea3086e5E55A3616852a25037f2B79B1Dd";

    const transaction = {
      to: nftAddress,
      data: encodeFunctionData({
        abi: realbuilderSBTabi,
        functionName: "safeMint",
        args: [address as Hex, roleImage as Hex],
      }),
    };

    const partialUserOp = await smartWallet.buildUserOp([transaction]);

    const biconomyPaymaster = await createPaymaster({ paymasterUrl: import.meta.env.VITE_BICONOMY_PAYMASTER_URL });

    const paymasterServiceData: SponsorUserOperationDto = {
      mode: PaymasterMode.SPONSORED,
    };

    try {
      const paymasterAndDataResponse = await biconomyPaymaster.getPaymasterAndData(
        partialUserOp,
        paymasterServiceData,
      );
      partialUserOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;

      const userOpResponse = await smartWallet.sendUserOp(partialUserOp);
      
      const transactionDetails = await userOpResponse.wait();

      console.log("Transaction Hash:", transactionDetails.receipt.transactionHash);

      if (transactionDetails.success === 'true') {
        console.log("Transaction Receipt:", transactionDetails.receipt);
      }
    } catch (error) {
      console.error("Error minting NFT:", error);
    } finally {
      onClaim();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
      <div className="text-white text-4xl mb-4">Congratulations!</div>
      <img src={roleImage} alt={role} className="w-1/5 h-auto mb-4" />
      <div className="text-white text-2xl mb-4">{role}</div>
      <button onClick={handleClaim} className="nes-btn is-primary">Claim</button>
    </div>
  );
};

export default Fireworks;
