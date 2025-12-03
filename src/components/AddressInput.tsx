import { useState } from 'react';
import { Network } from '../App';
import svgPaths from "../imports/svg-ukiqoek83j";
import imgTronNetwork from "figma:asset/841f3d1f868a3d71a01649b4307b9a1c1259e399.png";
import imgEthereumNetwork from "figma:asset/3f415cd75e8a755a032ae16a3406c41dcc2d667a.png";
import imgBscNetwork from "figma:asset/ba6dfbe8a2524a21851b06772dc28366a4c8ed67.png";
import imgTrustPng from "figma:asset/3b26afbbdb37dd8d6d80ef072c64f6bb1cb62f6e.png";
import imgMetamaskPng from "figma:asset/95cfcdc3aa4cbdf3af7a2d6dd2914b3db8ca4527.png";
import { WalletConnectDialog } from './WalletConnectDialog';

interface AddressInputProps {
  network: Network;
  onCheck: (address: string) => void;
  onBack: () => void;
}

function WalletconnectSvg() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="walletconnect.svg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g clipPath="url(#clip0_4_267)" id="walletconnect.svg">
          <path d={svgPaths.p29cd0740} fill="var(--fill-0, #E7EEFC)" id="Vector" />
          <path d={svgPaths.p3e591cf0} fill="var(--fill-0, #3B99FC)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_4_267">
            <rect fill="white" height="40" width="40" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export function AddressInput({ network, onCheck, onBack }: AddressInputProps) {
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [address, setAddress] = useState('');
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [showWalletDialog, setShowWalletDialog] = useState(false);

  const networkNames = {
    tron: 'Tron Network',
    ethereum: 'Ethereum Network',
    bsc: 'BSC Network'
  };

  const handleWalletClick = (walletType: string) => {
    setShowWalletDialog(true);
  };

  const handleWalletConnect = (walletType: string, address: string) => {
    setSelectedWallet(walletType);
    setShowWalletDialog(false);
    setAddress(address);
    setShowAddressInput(true);
  };

  const handleSubmit = () => {
    if (address.trim()) {
      onCheck(address);
    }
  };

  if (showAddressInput) {
    return (
      <div className="bg-white min-h-[474px] relative rounded-[20px] shrink-0 w-full">
        <div aria-hidden="true" className="absolute border border-[rgba(5,15,25,0.08)] border-solid inset-0 pointer-events-none rounded-[20px]" />
        <div className="min-h-inherit size-full">
          <div className="box-border content-stretch flex flex-col items-start min-h-inherit p-[21px] relative w-full">
            {/* Header */}
            <div className="content-stretch flex flex-col items-start justify-between relative shrink-0 w-full">
              <div className="bg-[rgba(0,87,255,0.1)] box-border content-stretch flex h-[24px] items-center px-[13px] py-[5px] relative rounded-[12px] shrink-0">
                <div aria-hidden="true" className="absolute border border-[rgba(0,87,255,0.15)] border-solid inset-0 pointer-events-none rounded-[12px]" />
                <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#0057ff] text-[12px] text-nowrap">
                  <p className="leading-[normal] whitespace-pre">Step 2</p>
                </div>
              </div>
              <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#050f19] text-[24px] text-nowrap">
                <p className="leading-[32px] whitespace-pre">Enter wallet address</p>
              </div>
            </div>

            {/* Description */}
            <div className="box-border content-stretch flex flex-col items-start max-w-[360px] pb-[20px] pt-[6px] px-0 relative shrink-0 w-full">
              <div className="content-stretch flex flex-col items-start max-w-[360px] relative shrink-0 w-full">
                <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[normal] not-italic relative shrink-0 text-[16px] text-[rgba(5,15,25,0.4)] w-full">
                  <p className="mb-0">Please enter your wallet address to</p>
                  <p>continue the AML check</p>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="w-full mb-auto">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter wallet address..."
                className="w-full px-4 py-3 rounded-[12px] border border-[rgba(5,15,25,0.08)] font-['Inter:Regular',sans-serif] text-[15px] focus:outline-none focus:border-[#0057ff] transition-colors"
              />
            </div>

            {/* Check Button */}
            <div className="box-border content-stretch flex flex-col h-[72px] items-end pb-0 pt-[24px] px-0 relative shrink-0 w-full">
              <button
                onClick={handleSubmit}
                disabled={!address.trim()}
                className="h-[48px] relative rounded-[16px] shrink-0 w-full transition-all"
                style={{
                  backgroundColor: '#0057ff',
                  opacity: address.trim() ? 1 : 0.25,
                  cursor: address.trim() ? 'pointer' : 'not-allowed'
                }}
              >
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="box-border content-stretch flex h-[48px] items-center justify-center pb-[14.5px] pt-[13.5px] px-[10px] relative w-full">
                    <div className="basis-0 flex flex-col font-['Arial:Bold',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[18px] text-center text-white">
                      <p className="leading-[normal]">Check Wallet</p>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-[474px] relative rounded-[20px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[rgba(5,15,25,0.08)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="min-h-inherit size-full">
        <div className="box-border content-stretch flex flex-col items-start min-h-inherit p-[21px] relative w-full">
          {/* Header */}
          <div className="content-stretch flex flex-col items-start justify-between relative shrink-0 w-full">
            <div className="bg-[rgba(0,87,255,0.1)] box-border content-stretch flex h-[24px] items-center px-[13px] py-[5px] relative rounded-[12px] shrink-0">
              <div aria-hidden="true" className="absolute border border-[rgba(0,87,255,0.15)] border-solid inset-0 pointer-events-none rounded-[12px]" />
              <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#0057ff] text-[12px] text-nowrap">
                <p className="leading-[normal] whitespace-pre">Step 2</p>
              </div>
            </div>
            <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#050f19] text-[24px] text-nowrap">
              <p className="leading-[32px] whitespace-pre">Check wallet</p>
            </div>
          </div>

          {/* Description */}
          <div className="box-border content-stretch flex flex-col items-start max-w-[360px] pb-[20px] pt-[6px] px-0 relative shrink-0 w-full">
            <div className="content-stretch flex flex-col items-start max-w-[360px] relative shrink-0 w-full">
              <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[normal] not-italic relative shrink-0 text-[16px] text-[rgba(5,15,25,0.4)] w-full">
                <p className="mb-0">To continue, select and connect your</p>
                <p>wallet</p>
              </div>
            </div>
          </div>

          {/* Selected Network Display */}
          <div className="bg-[rgba(5,15,25,0.03)] relative rounded-[16px] shrink-0 w-full">
            <div aria-hidden="true" className="absolute border border-[rgba(5,15,25,0.08)] border-solid inset-0 pointer-events-none rounded-[16px]" />
            <div className="flex flex-row items-center size-full">
              <div className="box-border content-stretch flex gap-[16px] items-center px-[17px] py-[13px] relative w-full">
                <div className="relative shrink-0 size-[40px]">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img alt="" className="absolute left-0 max-w-none size-full top-0" src={network === 'tron' ? imgTronNetwork : network === 'ethereum' ? imgEthereumNetwork : imgBscNetwork} />
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                    <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black text-nowrap">
                      <p className="leading-[24px] whitespace-pre">{networkNames[network]}</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                    <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(5,15,25,0.4)] text-nowrap">
                      <p className="leading-[20px] whitespace-pre">Selected network</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wallet Options */}
          <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[24px] px-0 relative shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              {/* Check Wallet Button */}
              <button
                onClick={() => handleWalletClick('check')}
                className="bg-white relative rounded-[16px] shrink-0 w-full transition-all hover:shadow-md"
              >
                <div aria-hidden="true" className="absolute border border-[rgba(5,15,25,0.08)] border-solid inset-0 pointer-events-none rounded-[16px]" />
                <div className="flex flex-row items-center size-full">
                  <div className="box-border content-stretch flex gap-[16px] items-center px-[17px] py-[13px] relative w-full">
                    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[40px]">
                      <WalletconnectSvg />
                    </div>
                    <div className="content-stretch flex flex-col items-start relative shrink-0">
                      <div className="content-stretch flex flex-col items-center relative shrink-0">
                        <div className="flex flex-col font-['Arial:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black text-center text-nowrap">
                          <p className="leading-[24px] whitespace-pre">Check Wallet</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              {/* Trust Wallet Button */}
              <button
                onClick={() => handleWalletClick('trust')}
                className="bg-white relative rounded-[16px] shrink-0 w-full transition-all hover:shadow-md"
              >
                <div aria-hidden="true" className="absolute border border-[rgba(5,15,25,0.08)] border-solid inset-0 pointer-events-none rounded-[16px]" />
                <div className="flex flex-row items-center size-full">
                  <div className="box-border content-stretch flex gap-[16px] items-center px-[17px] py-[13px] relative w-full">
                    <div className="relative shrink-0 size-[40px]">
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgTrustPng} />
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative shrink-0">
                      <div className="content-stretch flex flex-col items-center relative shrink-0">
                        <div className="flex flex-col font-['Arial:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black text-center text-nowrap">
                          <p className="leading-[24px] whitespace-pre">Trust Wallet</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              {/* Metamask Button */}
              <button
                onClick={() => handleWalletClick('metamask')}
                className="bg-white relative rounded-[16px] shrink-0 w-full transition-all hover:shadow-md"
              >
                <div aria-hidden="true" className="absolute border border-[rgba(5,15,25,0.08)] border-solid inset-0 pointer-events-none rounded-[16px]" />
                <div className="flex flex-row items-center size-full">
                  <div className="box-border content-stretch flex gap-[16px] items-center px-[17px] py-[13px] relative w-full">
                    <div className="relative shrink-0 size-[40px]">
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgMetamaskPng} />
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative shrink-0">
                      <div className="content-stretch flex flex-col items-center relative shrink-0">
                        <div className="flex flex-col font-['Arial:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black text-center text-nowrap">
                          <p className="leading-[24px] whitespace-pre">Metamask</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Error Message (Hidden) */}
          <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[24px] px-0 relative shrink-0 w-full">
            <div className="content-stretch flex flex-col items-center opacity-0 relative shrink-0 w-full">
              <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f04438] text-[16px] text-center w-full">
                <p className="leading-[normal]">error</p>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="box-border content-stretch flex flex-col h-[72px] items-end pb-0 pt-[24px] px-0 relative shrink-0 w-full">
            <button
              onClick={onBack}
              className="bg-[#0057ff] h-[48px] relative rounded-[16px] shrink-0 w-full transition-all hover:opacity-90"
            >
              <div className="flex flex-row items-center justify-center size-full">
                <div className="box-border content-stretch flex h-[48px] items-center justify-center pb-[14.5px] pt-[13.5px] px-[10px] relative w-full">
                  <div className="basis-0 flex flex-col font-['Arial:Bold',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[18px] text-center text-white">
                    <p className="leading-[normal]">Back</p>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Wallet Connect Dialog */}
      <WalletConnectDialog 
        isOpen={showWalletDialog}
        onClose={() => setShowWalletDialog(false)}
        onConnect={handleWalletConnect}
      />
    </div>
  );
}