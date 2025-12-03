import { Network } from '../App';
import { TRON_LOGO, ETHEREUM_LOGO, BSC_LOGO } from '../assets/images';

interface NetworkSelectionProps {
  selectedNetwork: Network | null;
  onSelectNetwork: (network: Network) => void;
  onContinue: () => void;
}

export function NetworkSelection({ selectedNetwork, onSelectNetwork, onContinue }: NetworkSelectionProps) {
  return (
    <div className="bg-white min-h-[474px] relative rounded-[20px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(5,15,25,0.08)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="min-h-inherit size-full">
        <div className="box-border content-stretch flex flex-col items-start min-h-inherit p-[21px] relative w-full">
          {/* Header */}
          <div className="content-stretch flex flex-col items-start justify-between relative shrink-0 w-full">
            <div className="bg-[rgba(0,87,255,0.1)] box-border content-stretch flex h-[24px] items-center px-[13px] py-[5px] relative rounded-[12px] shrink-0">
              <div aria-hidden="true" className="absolute border border-[rgba(0,87,255,0.15)] border-solid inset-0 pointer-events-none rounded-[12px]" />
              <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#0057ff] text-[12px] text-nowrap">
                <p className="leading-[normal] whitespace-pre">Step 1</p>
              </div>
            </div>
            <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#050f19] text-[24px] text-nowrap">
              <p className="leading-[32px] whitespace-pre">Wallet check</p>
            </div>
          </div>

          {/* Description */}
          <div className="box-border content-stretch flex flex-col items-start max-w-[360px] pb-[20px] pt-[6px] px-0 relative shrink-0 w-full">
            <div className="content-stretch flex flex-col items-start max-w-[360px] relative shrink-0 w-full">
              <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[normal] not-italic relative shrink-0 text-[15px] text-[rgba(5,15,25,0.4)] w-full">
                <p className="mb-0">To continue, please select the desired</p>
                <p>network</p>
              </div>
            </div>
          </div>

          {/* Tron Network */}
          <button
            onClick={() => onSelectNetwork('tron')}
            className="bg-white relative rounded-[16px] shrink-0 w-full transition-all hover:shadow-md"
            style={{
              border: selectedNetwork === 'tron' ? '2px solid #0057ff' : '1px solid rgba(5,15,25,0.08)'
            }}
          >
            <div className="flex flex-row items-center size-full">
              <div className="box-border content-stretch flex gap-[16px] items-center px-[17px] py-[13px] relative w-full">
                <div className="relative shrink-0 size-[40px]">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img alt="" className="absolute left-0 max-w-none size-full top-0" src={TRON_LOGO} />
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                    <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black text-nowrap">
                      <p className="leading-[24px] whitespace-pre">Tron Network</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                    <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(5,15,25,0.4)] text-nowrap">
                      <p className="leading-[20px] whitespace-pre">TRC-20</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>

          {/* Ethereum Network */}
          <div className="box-border content-stretch flex flex-col items-start max-h-[80px] pb-0 pt-[10px] px-0 relative shrink-0 w-full">
            <button
              onClick={() => onSelectNetwork('ethereum')}
              className="bg-white max-h-[70px] relative rounded-[16px] shrink-0 w-full transition-all hover:shadow-md"
              style={{
                border: selectedNetwork === 'ethereum' ? '2px solid #0057ff' : '1px solid rgba(5,15,25,0.08)'
              }}
            >
              <div className="flex flex-row items-center max-h-inherit size-full">
                <div className="box-border content-stretch flex gap-[16px] items-center max-h-inherit px-[17px] py-[13px] relative w-full">
                  <div className="relative shrink-0 size-[40px]">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img alt="" className="absolute left-0 max-w-none size-full top-0" src={ETHEREUM_LOGO} />
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black text-nowrap">
                        <p className="leading-[24px] whitespace-pre">Ethereum Network</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(5,15,25,0.4)] text-nowrap">
                        <p className="leading-[20px] whitespace-pre">ERC-20</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* BSC Network */}
          <div className="box-border content-stretch flex flex-col items-start max-h-[80px] pb-0 pt-[10px] px-0 relative shrink-0 w-full">
            <button
              onClick={() => onSelectNetwork('bsc')}
              className="bg-white max-h-[70px] relative rounded-[16px] shrink-0 w-full transition-all hover:shadow-md"
              style={{
                border: selectedNetwork === 'bsc' ? '2px solid #0057ff' : '1px solid rgba(5,15,25,0.08)'
              }}
            >
              <div className="flex flex-row items-center max-h-inherit size-full">
                <div className="box-border content-stretch flex gap-[16px] items-center max-h-inherit px-[17px] py-[13px] relative w-full">
                  <div className="relative shrink-0 size-[40px]">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img alt="" className="absolute left-0 max-w-none size-full top-0" src={BSC_LOGO} />
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black text-nowrap">
                        <p className="leading-[24px] whitespace-pre">BSC Network</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(5,15,25,0.4)] text-nowrap">
                        <p className="leading-[20px] whitespace-pre">BEP-20</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* Continue Button */}
          <div className="box-border content-stretch flex flex-col h-[72px] items-end pb-0 pt-[24px] px-0 relative shrink-0 w-full">
            <button
              onClick={onContinue}
              disabled={!selectedNetwork}
              className="h-[48px] relative rounded-[16px] shrink-0 w-full transition-all"
              style={{
                backgroundColor: '#0057ff',
                opacity: selectedNetwork ? 1 : 0.25,
                cursor: selectedNetwork ? 'pointer' : 'not-allowed'
              }}
            >
              <div className="flex flex-row items-center justify-center size-full">
                <div className="box-border content-stretch flex h-[48px] items-center justify-center pb-[14.5px] pt-[13.5px] px-[10px] relative w-full">
                  <div className="basis-0 flex flex-col font-['Arial:Bold',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[18px] text-center text-white">
                    <p className="leading-[normal]">Continue</p>
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