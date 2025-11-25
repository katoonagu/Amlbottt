import { Network } from '../App';
import { CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react';

interface CheckResultsProps {
  network: Network;
  address: string;
  onStartOver: () => void;
}

export function CheckResults({ network, address, onStartOver }: CheckResultsProps) {
  // Mock data for demo purposes
  const riskLevel = Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low';
  const riskScore = riskLevel === 'low' ? Math.floor(Math.random() * 30) : 
                    riskLevel === 'medium' ? Math.floor(Math.random() * 40) + 30 : 
                    Math.floor(Math.random() * 30) + 70;

  const networkNames = {
    tron: 'Tron Network (TRC-20)',
    ethereum: 'Ethereum Network (ERC-20)',
    bsc: 'BSC Network (BEP-20)'
  };

  const getRiskColor = () => {
    if (riskLevel === 'low') return '#10B981';
    if (riskLevel === 'medium') return '#F59E0B';
    return '#EF4444';
  };

  const getRiskIcon = () => {
    if (riskLevel === 'low') return <CheckCircle2 className="size-6" />;
    if (riskLevel === 'medium') return <AlertTriangle className="size-6" />;
    return <XCircle className="size-6" />;
  };

  const getRiskText = () => {
    if (riskLevel === 'low') return 'Low Risk';
    if (riskLevel === 'medium') return 'Medium Risk';
    return 'High Risk';
  };

  const checks = [
    { name: 'Sanctions Check', passed: riskLevel !== 'high', info: 'No connections to sanctioned entities' },
    { name: 'Blacklist Check', passed: riskLevel === 'low', info: 'Not found in known blacklists' },
    { name: 'Mixer Detection', passed: riskLevel !== 'high', info: 'No mixing service activity detected' },
    { name: 'Fraud History', passed: riskLevel === 'low', info: 'No fraudulent activity reported' },
    { name: 'Source of Funds', passed: riskLevel !== 'high', info: 'Transaction sources verified' }
  ];

  return (
    <div className="bg-white relative rounded-[20px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[rgba(5,15,25,0.08)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[21px] relative w-full">
          {/* Header */}
          <div className="content-stretch flex flex-col items-start justify-between relative shrink-0 w-full mb-6">
            <div className="bg-[rgba(0,87,255,0.1)] box-border content-stretch flex h-[24px] items-center px-[13px] py-[5px] relative rounded-[12px] shrink-0 mb-3">
              <div aria-hidden="true" className="absolute border border-[rgba(0,87,255,0.15)] border-solid inset-0 pointer-events-none rounded-[12px]" />
              <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#0057ff] text-[12px] text-nowrap">
                <p className="leading-[normal] whitespace-pre">Step 3</p>
              </div>
            </div>
            <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#050f19] text-[24px] text-nowrap">
              <p className="leading-[32px] whitespace-pre">Check Results</p>
            </div>
          </div>

          {/* Risk Score Card */}
          <div 
            className="w-full rounded-[16px] p-6 mb-6"
            style={{ backgroundColor: `${getRiskColor()}15` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3" style={{ color: getRiskColor() }}>
                {getRiskIcon()}
                <span className="font-['Inter:Bold',sans-serif] text-[22px]">
                  {getRiskText()}
                </span>
              </div>
              <div className="font-['Inter:Bold',sans-serif] text-[28px]" style={{ color: getRiskColor() }}>
                {riskScore}%
              </div>
            </div>
            <div className="font-['Inter:Medium',sans-serif] text-[14px] text-[rgba(5,15,25,0.6)]">
              Risk assessment score based on comprehensive AML checks
            </div>
          </div>

          {/* Wallet Info */}
          <div className="bg-[rgba(5,15,25,0.02)] rounded-[12px] p-4 mb-6 w-full">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <span className="font-['Inter:Medium',sans-serif] text-[13px] text-[rgba(5,15,25,0.5)]">
                  Network
                </span>
                <span className="font-['Inter:Medium',sans-serif] text-[13px] text-[#050f19]">
                  {networkNames[network]}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="font-['Inter:Medium',sans-serif] text-[13px] text-[rgba(5,15,25,0.5)]">
                  Address
                </span>
                <span className="font-['Inter:Medium',sans-serif] text-[13px] text-[#050f19] break-all text-right max-w-[200px]">
                  {address.substring(0, 10)}...{address.substring(address.length - 10)}
                </span>
              </div>
            </div>
          </div>

          {/* Checks List */}
          <div className="w-full mb-6">
            <div className="font-['Inter:Semi_Bold',sans-serif] text-[16px] text-[#050f19] mb-3">
              Detailed Checks
            </div>
            <div className="flex flex-col gap-2">
              {checks.map((check, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-[12px] border border-[rgba(5,15,25,0.08)] p-3 flex items-start gap-3"
                >
                  <div className="mt-0.5">
                    {check.passed ? (
                      <CheckCircle2 className="size-5 text-[#10B981]" />
                    ) : (
                      <XCircle className="size-5 text-[#EF4444]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-['Inter:Medium',sans-serif] text-[14px] text-[#050f19]">
                      {check.name}
                    </div>
                    <div className="font-['Inter:Regular',sans-serif] text-[12px] text-[rgba(5,15,25,0.5)] mt-0.5">
                      {check.info}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-[rgba(0,87,255,0.05)] rounded-[12px] p-4 mb-6 w-full flex gap-3">
            <Info className="size-5 text-[#0057ff] shrink-0 mt-0.5" />
            <div className="font-['Inter:Regular',sans-serif] text-[13px] text-[rgba(5,15,25,0.7)]">
              This is an automated risk assessment. Results should be verified with additional due diligence procedures.
            </div>
          </div>

          {/* Start Over Button */}
          <button
            onClick={onStartOver}
            className="h-[48px] relative rounded-[16px] shrink-0 w-full transition-all bg-[#0057ff] hover:opacity-90"
          >
            <div className="flex flex-row items-center justify-center size-full">
              <div className="box-border content-stretch flex h-[48px] items-center justify-center pb-[14.5px] pt-[13.5px] px-[10px] relative w-full">
                <div className="basis-0 flex flex-col font-['Arial:Bold',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[18px] text-center text-white">
                  <p className="leading-[normal]">Check Another Wallet</p>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
