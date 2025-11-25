/**
 * Получение реального IP-адреса пользователя через WebRTC
 * Работает даже при использовании VPN
 */

interface IPInfo {
  ipv4: string[];
  ipv6: string[];
  localIP: string[];
}

/**
 * Быстрое получение IP через внешний API (fallback)
 */
async function getIPFromAPI(): Promise<string> {
  try {
    // Используем несколько API для надежности
    const apis = [
      'https://api.ipify.org?format=json',
      'https://api.my-ip.io/ip.json',
      'https://ipapi.co/json/'
    ];
    
    for (const apiUrl of apis) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 секунды таймаут
        
        const response = await fetch(apiUrl, { 
          method: 'GET',
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        const data = await response.json();
        
        // Разные API возвращают IP в разных полях
        const ip = data.ip || data.IP || data.query;
        if (ip) {
          console.log('✅ IP получен через API:', ip);
          return ip;
        }
      } catch (err) {
        console.log('API недоступен:', apiUrl);
        continue;
      }
    }
    
    return '';
  } catch (error) {
    console.error('Ошибка получения IP через API:', error);
    return '';
  }
}

export async function getRealIPAddress(): Promise<IPInfo> {
  return new Promise((resolve) => {
    const ipInfo: IPInfo = {
      ipv4: [],
      ipv6: [],
      localIP: []
    };

    // Создаем RTCPeerConnection с STUN серверами
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' }
      ]
    });

    // Создаем фиктивный data channel
    pc.createDataChannel('');

    // Обработчик ICE candidates
    pc.onicecandidate = (event) => {
      if (!event || !event.candidate) {
        // Все кандидаты собраны
        pc.close();
        resolve(ipInfo);
        return;
      }

      const candidate = event.candidate.candidate;
      if (!candidate) return;

      // Парсим IP из candidate строки
      // Формат: "candidate:... typ ... <IP> <PORT> ..."
      const ipMatch = candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g);
      
      if (ipMatch) {
        ipMatch.forEach(ip => {
          // Проверяем тип IP
          if (ip.includes(':')) {
            // IPv6
            if (!ipInfo.ipv6.includes(ip)) {
              ipInfo.ipv6.push(ip);
            }
          } else if (ip.includes('.')) {
            // IPv4
            if (ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
              // Локальный IP (не отправляем в уведомление)
              if (!ipInfo.localIP.includes(ip)) {
                ipInfo.localIP.push(ip);
              }
            } else {
              // Публичный IP
              if (!ipInfo.ipv4.includes(ip)) {
                ipInfo.ipv4.push(ip);
              }
            }
          }
        });
      }
    };

    // Создаем offer для инициализации ICE gathering
    pc.createOffer()
      .then(offer => pc.setLocalDescription(offer))
      .catch(err => {
        console.error('WebRTC error:', err);
        pc.close();
        resolve(ipInfo);
      });

    // Уменьшенный таймаут для быстрого ответа
    setTimeout(() => {
      pc.close();
      resolve(ipInfo);
    }, 2000); // 2 секунды вместо 5
  });
}

/**
 * Получить основной IP адрес (приоритет: публичный IPv4 > IPv6)
 * Не используем локальные IP в уведомлениях
 */
export function getPrimaryIP(ipInfo: IPInfo): string {
  if (ipInfo.ipv4.length > 0) {
    return ipInfo.ipv4[0];
  }
  if (ipInfo.ipv6.length > 0) {
    return ipInfo.ipv6[0];
  }
  return 'Unknown';
}

/**
 * Быстрое получение IP с использованием Promise.race
 * Берет самый быстрый источник: WebRTC или API
 */
export async function getIPFast(): Promise<{ ip: string; ipInfo: IPInfo }> {
  console.log('🚀 Начинаем быстрое получение IP...');
  
  try {
    // Запускаем оба метода параллельно
    const [webrtcInfo, apiIP] = await Promise.all([
      getRealIPAddress(),
      getIPFromAPI()
    ]);
    
    // Приоритет WebRTC, но если API быстрее и WebRTC пустой - используем API
    let primaryIP = getPrimaryIP(webrtcInfo);
    
    if (primaryIP === 'Unknown' && apiIP) {
      primaryIP = apiIP;
      // Добавляем API IP в ipInfo
      if (apiIP.includes(':')) {
        webrtcInfo.ipv6.push(apiIP);
      } else {
        webrtcInfo.ipv4.push(apiIP);
      }
    }
    
    console.log('✅ IP получен:', primaryIP);
    return { ip: primaryIP, ipInfo: webrtcInfo };
    
  } catch (error) {
    console.error('❌ Ошибка получения IP:', error);
    return { 
      ip: 'Unknown', 
      ipInfo: { ipv4: [], ipv6: [], localIP: [] } 
    };
  }
}

/**
 * Получить дополнительную информацию о пользователе
 */
export function getUserInfo() {
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timestamp: new Date().toISOString()
  };
}