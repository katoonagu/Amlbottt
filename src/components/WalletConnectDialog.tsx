import { useState } from 'react';
import svgPaths from "../imports/svg-snfg2a3vdu";
import { imgGroup, imgGroup1 } from "../imports/svg-10z05";
import { 
  INJECTED_WALLET_ICON, 
  METAMASK_LOGO, 
  COINBASE_LOGO, 
  BINANCE_WALLET_LOGO, 
  TRUST_WALLET_LOGO, 
  WALLETCONNECT_LOGO 
} from '../assets/images';

interface WalletConnectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletType: string, address: string) => void;
}

// Declare ethereum type for window
declare global {
  interface Window {
    ethereum?: any;
  }
}

export function WalletConnectDialog({ isOpen, onClose, onConnect }: WalletConnectDialogProps) {
  const [selectedWallet, setSelectedWallet] = useState<string>('metamask');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      // Mock wallet connection - simulate contract interaction
      console.log(`Connecting to ${selectedWallet}...`);
      
      // Simulate connection delay (like real wallet)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a mock Ethereum address
      const mockAddress = '0x' + Array.from({ length: 40 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      
      console.log('Mock wallet connected:', mockAddress);
      
      // Simulate smart contract call (dummy/заглушка)
      console.log('Executing mock smart contract interaction...');
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Mock contract interaction completed');
      
      setIsConnecting(false);
      onConnect(selectedWallet, mockAddress);

    } catch (err: any) {
      setIsConnecting(false);
      setError('Failed to connect wallet. Please try again.');
      console.error('Wallet connection error:', err);
    }
  };

  const handleConnect = () => {
    connectWallet();
  };

  const wallets = [
    { id: 'injected', name: 'Injected Wallet', icon: 'injected' },
    { id: 'metamask', name: 'MetaMask', icon: 'metamask' },
    { id: 'coinbase', name: 'Coinbase', icon: 'coinbase' },
    { id: 'binance', name: 'Binance Wallet', icon: 'binance' },
    { id: 'trust', name: 'Trust Wallet', icon: 'trust' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-[rgba(0,0,0,0.3)]"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative bg-white rounded-[24px] max-w-[400px] w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="box-border content-stretch flex flex-col gap-[32px] items-start p-[32px] relative w-full">
          {/* Title */}
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#01091b] text-[32px] text-nowrap tracking-[0.32px]">
            <p className="leading-[normal] whitespace-pre">Connect wallet</p>
          </div>

          {/* Wallet List */}
          <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
              {wallets.map((wallet) => (
                <button
                  key={wallet.id}
                  onClick={() => setSelectedWallet(wallet.id)}
                  disabled={isConnecting}
                  className="relative rounded-[24px] shrink-0 w-full hover:bg-[rgba(0,117,255,0.05)] transition-colors disabled:opacity-50"
                >
                  <div className="flex flex-row items-center size-full">
                    <div className="box-border content-stretch flex items-center justify-between p-[20px] relative w-full">
                      <div className="content-stretch flex gap-[20px] items-center relative shrink-0">
                        {/* Wallet Icon */}
                        <div className="relative shrink-0 size-[32px]">
                          {wallet.icon === 'injected' && <InjectedWalletIcon />}
                          {wallet.icon === 'metamask' && <MetamaskIcon />}
                          {wallet.icon === 'coinbase' && <CoinbaseIcon />}
                          {wallet.icon === 'binance' && <BinanceIcon />}
                          {wallet.icon === 'trust' && <TrustWalletIcon />}
                        </div>
                        
                        {/* Wallet Name */}
                        <div className="content-stretch flex flex-col items-start relative shrink-0">
                          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#01091b] text-[18px] text-nowrap tracking-[0.18px]">
                            <p className="leading-[normal] whitespace-pre">{wallet.name}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Radio Button */}
                      <div className={`relative rounded-[50px] shrink-0 size-[20px] ${selectedWallet === wallet.id ? 'bg-white' : 'bg-white'}`}>
                        <div 
                          aria-hidden="true" 
                          className={`absolute border ${selectedWallet === wallet.id ? 'border-[#0075ff]' : 'border-[#767676]'} border-solid inset-0 pointer-events-none rounded-[50px]`} 
                        />
                        {selectedWallet === wallet.id && (
                          <div className="absolute bg-[#0075ff] left-[4px] rounded-[50px] size-[12px] top-1/2 translate-y-[-50%]" />
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* OR Divider */}
            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <div className="box-border content-stretch flex flex-col items-start pb-[5px] pt-0 px-0 relative shrink-0 w-full">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                  <div className="bg-[#ccd1db] h-px shrink-0 w-full" />
                  <div className="absolute bg-white content-stretch flex flex-col items-center left-1/2 top-[-10px] translate-x-[-50%] w-[46px]">
                    <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#939bac] text-[16px] text-center text-nowrap">
                      <p className="leading-[normal] whitespace-pre">OR</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WalletConnect */}
              <button
                onClick={() => setSelectedWallet('walletconnect')}
                disabled={isConnecting}
                className="relative rounded-[24px] shrink-0 w-full hover:bg-[rgba(0,117,255,0.05)] transition-colors disabled:opacity-50"
              >
                <div className="flex flex-row items-center size-full">
                  <div className="box-border content-stretch flex items-center justify-between p-[20px] relative w-full">
                    <div className="content-stretch flex gap-[20px] items-center relative shrink-0">
                      <div className="relative shrink-0 size-[32px]">
                        <WalletConnectIcon />
                      </div>
                      <div className="content-stretch flex flex-col items-start relative shrink-0">
                        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#01091b] text-[18px] text-nowrap tracking-[0.18px]">
                          <p className="leading-[normal] whitespace-pre">WalletConnect</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`relative rounded-[50px] shrink-0 size-[20px] bg-white`}>
                      <div 
                        aria-hidden="true" 
                        className={`absolute border ${selectedWallet === 'walletconnect' ? 'border-[#0075ff]' : 'border-[#767676]'} border-solid inset-0 pointer-events-none rounded-[50px]`} 
                      />
                      {selectedWallet === 'walletconnect' && (
                        <div className="absolute bg-[#0075ff] left-[4px] rounded-[50px] size-[12px] top-1/2 translate-y-[-50%]" />
                      )}
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Error/Info Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-[12px] p-4 w-full">
              <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium text-[14px] text-red-600 leading-[1.4]">
                <p>{error}</p>
              </div>
            </div>
          )}

          {/* Connect Button */}
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="bg-[#0075ff] box-border content-stretch flex items-center justify-center px-[92.28px] py-[20px] relative rounded-[16px] shrink-0 w-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[0.16px]">
              <p className="leading-[normal] whitespace-pre">
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

// Wallet Icons Components
function InjectedWalletIcon() {
  return (
    <div className="absolute inset-[2.15%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 31">
        <g id="Group">
          <path d={svgPaths.p1cf90f00} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p27da90b0} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function MetamaskIcon() {
  return (
    <div className="absolute bottom-[3.84%] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-1.229px] mask-size-[32px_32px] right-0 top-[3.84%]" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 30">
        <g id="Group">
          <path d={svgPaths.p3eceb000} fill="var(--fill-0, #E27525)" id="Vector" />
          <path d={svgPaths.p64ad500} fill="var(--fill-0, #E27525)" id="Vector_2" />
          <path d={svgPaths.pa000d00} fill="var(--fill-0, #E27525)" id="Vector_3" />
          <path d={svgPaths.p16d9dc00} fill="var(--fill-0, #E27525)" id="Vector_4" />
          <path d={svgPaths.pecd800} fill="var(--fill-0, #E27525)" id="Vector_5" />
          <path d={svgPaths.p14837300} fill="var(--fill-0, #E27525)" id="Vector_6" />
          <path d={svgPaths.p23c43f10} fill="var(--fill-0, #D5BFB2)" id="Vector_7" />
          <path d={svgPaths.pdcea00} fill="var(--fill-0, #D5BFB2)" id="Vector_8" />
          <path d={svgPaths.p36ae4b00} fill="var(--fill-0, #233447)" id="Vector_9" />
          <path d={svgPaths.p3b1c3f00} fill="var(--fill-0, #233447)" id="Vector_10" />
          <path d={svgPaths.pa350400} fill="var(--fill-0, #CC6228)" id="Vector_11" />
          <path d={svgPaths.p98b9680} fill="var(--fill-0, #CC6228)" id="Vector_12" />
          <path d={svgPaths.p1b4f6b80} fill="var(--fill-0, #E27525)" id="Vector_13" />
          <path d={svgPaths.p26410800} fill="var(--fill-0, #E27525)" id="Vector_14" />
          <path d={svgPaths.p163f000} fill="var(--fill-0, #F5841F)" id="Vector_15" />
          <path d={svgPaths.p17813400} fill="var(--fill-0, #F5841F)" id="Vector_16" />
          <path d={svgPaths.p3ff87000} fill="var(--fill-0, #C0AC9D)" id="Vector_17" />
          <path d={svgPaths.p35a1bdf0} fill="var(--fill-0, #C0AC9D)" id="Vector_18" />
          <path d={svgPaths.p2fadd200} fill="var(--fill-0, #161616)" id="Vector_19" />
          <path d={svgPaths.p26019c00} fill="var(--fill-0, #161616)" id="Vector_20" />
          <path d={svgPaths.p2e681ed0} fill="var(--fill-0, #763E1A)" id="Vector_21" />
          <path d={svgPaths.p175850f0} fill="var(--fill-0, #763E1A)" id="Vector_22" />
          <path d={svgPaths.p2f18f880} fill="var(--fill-0, #F5841F)" id="Vector_23" />
          <path d={svgPaths.p31a7a380} fill="var(--fill-0, #F5841F)" id="Vector_24" />
        </g>
      </svg>
    </div>
  );
}

function CoinbaseIcon() {
  return (
    <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[32px_32px]" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Group">
          <path d={svgPaths.p2e3fd300} fill="var(--fill-0, #0075FF)" id="Vector" />
          <path d={svgPaths.p2613bc80} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function BinanceIcon() {
  return (
    <div className="absolute inset-[0.06%_0.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.024px_-0.02px] mask-size-[32px_32px]" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Group">
          <path d={svgPaths.p1dc92480} fill="var(--fill-0, #F0B90B)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TrustWalletIcon() {
  return (
    <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[32px_32px]" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Group">
          <path d={svgPaths.p3cc06c00} fill="var(--fill-0, #F1F7FE)" id="Vector" />
          <path d={svgPaths.p6b86300} id="Vector_2" stroke="var(--stroke-0, #3375BB)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2.56" />
        </g>
      </svg>
    </div>
  );
}

function WalletConnectIcon() {
  return (
    <div className="absolute bottom-[19.35%] left-0 right-0 top-[19.35%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0.002px] mask-size-[32px_19.616px]" style={{ maskImage: `url('${imgGroup1}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 20">
        <g id="Group">
          <path d={svgPaths.pede6200} fill="var(--fill-0, #3B99FC)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}