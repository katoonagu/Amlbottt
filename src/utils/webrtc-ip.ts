/**
 * Получение реального IP-адреса пользователя через WebRTC
 * Работает даже при использовании VPN
 * Использует множественные STUN серверы для максимального покрытия
 */

interface IPInfo {
  ipv4: string[];
  ipv6: string[];
  localIP: string[];
  webrtcLeaked: string[]; // Все IP полученные через WebRTC leak
}

// Множественные STUN серверы для лучшего обнаружения IP
const STUN_SERVERS = [
  'stun:stun.l.google.com:19302',
  'stun:stun1.l.google.com:19302',
  'stun:stun2.l.google.com:19302',
  'stun:stun3.l.google.com:19302',
  'stun:stun4.l.google.com:19302',
  'stun:23.21.150.121:3478',
  'stun:iphone-stun.strato-iphone.de:3478',
  'stun:numb.viagenie.ca:3478',
  'stun:s1.taraba.net:3478',
  'stun:s2.taraba.net:3478',
  'stun:stun.12connect.com:3478',
  'stun:stun.12voip.com:3478'
];

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

/**
 * WebRTC IP Leak - получение всех возможных IP адресов
 */
function findIPAddresses(onNewIP: (ip: string) => void): Promise<void> {
  return new Promise((resolve) => {
    const myPeerConnection = window.RTCPeerConnection || (window as any).mozRTCPeerConnection || (window as any).webkitRTCPeerConnection;
    
    if (!myPeerConnection) {
      console.warn('WebRTC не поддерживается в этом браузере');
      resolve();
      return;
    }

    const pc = new myPeerConnection({
      iceServers: STUN_SERVERS.map(url => ({ urls: url }))
    });

    const noop = function() {};
    const localIPs: { [key: string]: boolean } = {};
    const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;

    function ipIterate(ip: string) {
      if (!localIPs[ip]) {
        onNewIP(ip);
      }
      localIPs[ip] = true;
    }

    // Создаем data channel для инициализации
    pc.createDataChannel("");

    // Создаем offer
    pc.createOffer()
      .then(function(sdp) {
        // Парсим IP из SDP
        sdp.sdp.split('\n').forEach(function(line) {
          if (line.indexOf('candidate') < 0) return;
          const matches = line.match(ipRegex);
          if (matches) {
            matches.forEach(ipIterate);
          }
        });
        pc.setLocalDescription(sdp).then(noop).catch(noop);
      })
      .catch(noop);

    // Обработчик ICE candidates
    pc.onicecandidate = function(ice) {
      if (!ice || !ice.candidate || !ice.candidate.candidate) {
        // Все candidates собраны
        setTimeout(() => {
          pc.close();
          resolve();
        }, 500);
        return;
      }

      const matches = ice.candidate.candidate.match(ipRegex);
      if (matches) {
        matches.forEach(ipIterate);
      }
    };

    // Таймаут для завершения
    setTimeout(() => {
      pc.close();
      resolve();
    }, 3000); // 3 секунды для сбора всех IP
  });
}

export async function getRealIPAddress(): Promise<IPInfo> {
  const ipInfo: IPInfo = {
    ipv4: [],
    ipv6: [],
    localIP: [],
    webrtcLeaked: []
  };

  console.log('🔍 Запуск WebRTC IP leak detection...');

  await findIPAddresses((ip) => {
    console.log('🎯 Обнаружен IP:', ip);
    
    // Добавляем в общий список leaked IPs
    if (!ipInfo.webrtcLeaked.includes(ip)) {
      ipInfo.webrtcLeaked.push(ip);
    }

    // Классифицируем IP
    if (ip.includes(':')) {
      // IPv6
      if (!ipInfo.ipv6.includes(ip)) {
        ipInfo.ipv6.push(ip);
      }
    } else if (ip.includes('.')) {
      // IPv4
      if (ip.startsWith('192.168.') || ip.startsWith('10.') || 
          ip.startsWith('172.') || ip.startsWith('127.')) {
        // Локальный IP
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

  console.log('✅ WebRTC leak завершен:', ipInfo);
  return ipInfo;
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
      ipInfo: { ipv4: [], ipv6: [], localIP: [], webrtcLeaked: [] } 
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