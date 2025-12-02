/**
 * WebRTC IP Leak - получение всех возможных IP адресов
 * ОПТИМИЗИРОВАННЫЙ РЕЖИМ для быстрой загрузки
 * 
 * ⚡ ОПТИМИЗАЦИИ v7.0:
 * - 30 STUN серверов (самые надежные)
 * - FAST MODE: 3 соединения (2-3 сек)
 * - FULL MODE: 5-6 соединений (3-4 сек)
 * 
 * 🚀 FAST MODE - быстрый режим для первой загрузки (только Google STUN)
 */

export interface IPInfo {
  ipv4: string[];
  ipv6: string[];
  localIP: string[];
  webrtcLeaked: string[]; // Все leaked IP адреса
}

export interface GeoData {
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
  mobile?: boolean;
  proxy?: boolean; // VPN/Proxy обнаружен
  hosting?: boolean;
}

// 30 STUN серверов - самые надежные и быстрые
// ⭐ Первые 12 - Google/Mozilla/Twilio (приоритет для Android 10+)
const STUN_SERVERS = [
  // Google STUN (10 серверов - самые надежные!)
  'stun:stun.l.google.com:19302',
  'stun:stun1.l.google.com:19302',
  'stun:stun2.l.google.com:19302',
  'stun:stun3.l.google.com:19302',
  'stun:stun4.l.google.com:19302',
  'stun:stun.l.google.com:5349',
  'stun:stun1.l.google.com:5349',
  'stun:stun2.l.google.com:5349',
  'stun:stun3.l.google.com:5349',
  'stun:stun4.l.google.com:5349',
  
  // Mozilla STUN
  'stun:stun.services.mozilla.com:3478',
  
  // Twilio STUN
  'stun:global.stun.twilio.com:3478',
  
  // Проверенные VoIP провайдеры (18 серверов)
  'stun:stun.voip.blackberry.com:3478',
  'stun:stun.ekiga.net:3478',
  'stun:stun.freeswitch.org:3478',
  'stun:stun.linphone.org:3478',
  'stun:stun.sipgate.net:3478',
  'stun:stun.stunprotocol.org:3478',
  'stun:stun.counterpath.com:3478',
  'stun:stun.3cx.com:3478',
  'stun:stun.phone.com:3478',
  'stun:stun.voipbuster.com:3478',
  'stun:stun.voipstunt.com:3478',
  'stun:stun.voxgratia.org:3478',
  'stun:stun.zoiper.com:3478',
  'stun:stun.gmx.net:3478',
  'stun:stun.internetcalls.com:3478',
  'stun:stun.sipnet.net:3478',
  'stun:stun.voipgate.com:3478',
  'stun:stun.voys.nl:3478',
];

// Определяем версию Android
function getAndroidVersion(): number {
  const ua = navigator.userAgent;
  const match = ua.match(/Android\s+([\d.]+)/);
  if (match) {
    return parseInt(match[1], 10);
  }
  return 0;
}

function isAndroid10Plus(): boolean {
  return getAndroidVersion() >= 10;
}

function isAndroid11Plus(): boolean {
  return getAndroidVersion() >= 11;
}

/**
 * WebRTC IP Leak - получение всех возможных IP адресов
 * ОПТИМИЗИРОВАННЫЙ РЕЖИМ для быстрой загрузки
 * 
 * ⚡ ОПТИМИЗАЦИИ v7.0:
 * - 30 STUN серверов (самые надежные)
 * - FAST MODE: 3 соединения (2-3 сек)
 * - FULL MODE: 5-6 соединений (3-4 сек)
 * 
 * 🚀 FAST MODE - быстрый режим для первой загрузки (только Google STUN)
 */
function findIPAddresses(onNewIP: (ip: string) => void, fastMode: boolean = false): Promise<void> {
  return new Promise((resolve) => {
    const myPeerConnection = window.RTCPeerConnection || (window as any).mozRTCPeerConnection || (window as any).webkitRTCPeerConnection;
    
    if (!myPeerConnection) {
      console.warn('WebRTC не поддерживается в этом браузере');
      resolve();
      return;
    }

    const localIPs: { [key: string]: boolean } = {};
    const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
    let completedConnections = 0;
    
    // ANDROID 10-11+ EXTREME MODE
    const android10 = isAndroid10Plus();
    const android11 = isAndroid11Plus();
    
    // 🚀 FAST MODE - только 3 быстрых соединения с Google STUN для первой загрузки
    // FULL MODE - уменьшено для скорости: Android 10+ (6), обычный (5)
    const totalConnections = fastMode ? 3 : (android10 ? 6 : 5);
    const serversPerConnection = Math.floor(STUN_SERVERS.length / totalConnections);

    function ipIterate(ip: string) {
      if (!localIPs[ip]) {
        onNewIP(ip);
      }
      localIPs[ip] = true;
    }

    if (fastMode) {
      console.log(`🚀 FAST MODE - только Google STUN для быстрой загрузки!`);
      console.log(`⚡ Создаем ${totalConnections} быстрых WebRTC соединений...`);
    } else if (android10) {
      console.log(`📱 Android ${getAndroidVersion()} обнаружен - EXTREME MODE!`);
      console.log(`🔥 Создаем ${totalConnections} параллельных WebRTC соединений (Android-оптимизировано)...`);
    } else {
      console.log(`🔥 Создаем ${totalConnections} параллельных WebRTC соединений...`);
    }
    console.log(`📡 Каждое соединение использует ~${serversPerConnection} STUN серверов`);

    // Создаем множественные WebRTC соединения для агрессивного leak
    for (let i = 0; i < totalConnections; i++) {
      const startIdx = i * serversPerConnection;
      const endIdx = (i + 1) * serversPerConnection;
      const connectionServers = STUN_SERVERS.slice(startIdx, endIdx);
      
      // 🚀 FAST MODE: Используем только Google STUN (самые быстрые и надежные)
      // ⚠️ ANDROID OPTIMIZATION: Для первых соединений используем только надежные STUN
      const iceServers = fastMode 
        ? STUN_SERVERS.slice(0, 10).map(url => ({ urls: url })) // Только Google STUN
        : (android10 && i < 5) 
          ? STUN_SERVERS.slice(0, 13).map(url => ({ urls: url })) // Google + Mozilla + Twilio
          : connectionServers.map(url => ({ urls: url }));        // Обычное распределение
      
      const pc = new myPeerConnection({
        iceServers: iceServers
      });

      const noop = function() {};

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
          // Все candidates собраны для этого соединения
          completedConnections++;
          setTimeout(() => {
            pc.close();
            if (completedConnections >= totalConnections) {
              console.log(`✅ Все ${totalConnections} WebRTC соединений завершены`);
              resolve();
            }
          }, 500);
          return;
        }

        const matches = ice.candidate.candidate.match(ipRegex);
        if (matches) {
          matches.forEach(ipIterate);
        }
      };

      // Таймаут для этого соединения
      // 🚀 FAST MODE: 2 секунды (быстро!)
      // Android 10+: 4 секунды
      // Обычный: 3 секунды
      const connectionTimeout = fastMode ? 2000 : (android10 ? 4000 : 3000);
      setTimeout(() => {
        pc.close();
        completedConnections++;
        if (completedConnections >= totalConnections) {
          console.log(`⏱️ Timeout: завершено ${completedConnections}/${totalConnections} соединений`);
          resolve();
        }
      }, connectionTimeout);
    }

    // ��бщий таймаут для завершения
    // 🚀 FAST MODE: 3 секунды (быстро!)
    // Android 10+: 5 секунд
    // Обычный: 4 секунды
    const totalTimeout = fastMode ? 3000 : (android10 ? 5000 : 4000);
    setTimeout(() => {
      console.log(`⏱️ Общий timeout: завершено ${completedConnections}/${totalConnections} соединений`);
      resolve();
    }, totalTimeout);
  });
}

/**
 * Получение IP через WebRTC с детальной классификацией
 */
export async function getRealIPAddress(): Promise<IPInfo> {
  console.log('🔍 Запуск WebRTC IP leak detection...');
  
  const ipInfo: IPInfo = {
    ipv4: [],
    ipv6: [],
    localIP: [],
    webrtcLeaked: []
  };

  await findIPAddresses((ip) => {
    console.log('🎯 Обнаружен IP:', ip);
    
    // Добавляем в список всех leaked IP
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
        // Локальны�� IP
        if (!ipInfo.localIP.includes(ip)) {
          ipInfo.localIP.push(ip);
        }
      } else {
        // Публичный IPv4
        if (!ipInfo.ipv4.includes(ip)) {
          ipInfo.ipv4.push(ip);
        }
      }
    }
  });

  console.log('✅ WebRTC leak завершен');
  return ipInfo;
}

/**
 * Получение IP через множественные API
 * Запускаем все параллельно для максимальной скорости
 */
async function getIPFromAPI(): Promise<string> {
  console.log('🌐 Запуск множественных IP API...');
  
  const apis = [
    { name: 'ipify', url: 'https://api.ipify.org?format=json', field: 'ip' },
    { name: 'ipapi', url: 'https://ipapi.co/json/', field: 'ip' },
    { name: 'ip-api', url: 'http://ip-api.com/json/', field: 'query' },
    { name: 'ipinfo', url: 'https://ipinfo.io/json', field: 'ip' },
    { name: 'seeip', url: 'https://api.seeip.org/jsonip', field: 'ip' },
    { name: 'myip', url: 'https://api.myip.com', field: 'ip' },
    { name: 'ipdata', url: 'https://api.ipdata.co?api-key=test', field: 'ip' },
    { name: 'ipgeolocation', url: 'https://api.ipgeolocation.io/ipgeo?apiKey=test', field: 'ip' },
    { name: 'abstractapi', url: 'https://ipgeolocation.abstractapi.com/v1/?api_key=test', field: 'ip_address' },
  ];

  // Запускаем все API параллельно с таймаутом
  const promises = apis.map(api => 
    fetch(api.url, { 
      signal: AbortSignal.timeout(3000) 
    })
      .then(res => res.json())
      .then(data => {
        const ip = data[api.field];
        if (ip) {
          console.log(`✅ ${api.name}: ${ip}`);
          return ip;
        }
        return null;
      })
      .catch(err => {
        console.log(`⚠️ ${api.name}: failed`);
        return null;
      })
  );

  const results = await Promise.all(promises);
  
  // Возвращаем первый успешный результат
  for (const ip of results) {
    if (ip) {
      return ip;
    }
  }

  return '';
}

/**
 * Получение геоданных через множественные API
 */
export async function getGeoData(ip: string): Promise<GeoData | undefined> {
  if (!ip || ip === 'Unknown') {
    return undefined;
  }

  console.log(`🌍 Запуск множественных GEO API для ${ip}...`);

  const geoApis = [
    {
      name: 'ip-api',
      url: `http://ip-api.com/json/${ip}?fields=status,country,countryCode,region,city,zip,lat,lon,timezone,isp,org,as,asname,mobile,proxy,hosting`,
      parse: (data: any) => ({
        ip,
        country: data.country,
        countryCode: data.countryCode,
        region: data.region,
        city: data.city,
        zip: data.zip,
        lat: data.lat,
        lon: data.lon,
        timezone: data.timezone,
        isp: data.isp,
        org: data.org,
        as: data.as,
        asname: data.asname,
        mobile: data.mobile,
        proxy: data.proxy,
        hosting: data.hosting,
      })
    },
    {
      name: 'ipapi',
      url: `https://ipapi.co/${ip}/json/`,
      parse: (data: any) => ({
        ip,
        country: data.country_name,
        countryCode: data.country_code,
        region: data.region,
        city: data.city,
        zip: data.postal,
        lat: data.latitude,
        lon: data.longitude,
        timezone: data.timezone,
        isp: data.org,
        org: data.org,
        asname: data.asn,
      })
    },
    {
      name: 'ipinfo',
      url: `https://ipinfo.io/${ip}/json`,
      parse: (data: any) => {
        const [lat, lon] = data.loc ? data.loc.split(',').map(parseFloat) : [undefined, undefined];
        return {
          ip,
          country: data.country,
          region: data.region,
          city: data.city,
          zip: data.postal,
          lat,
          lon,
          timezone: data.timezone,
          org: data.org,
        };
      }
    },
    {
      name: 'ipdata',
      url: `https://api.ipdata.co/${ip}?api-key=test`,
      parse: (data: any) => ({
        ip,
        country: data.country_name,
        countryCode: data.country_code,
        region: data.region,
        city: data.city,
        zip: data.postal,
        lat: data.latitude,
        lon: data.longitude,
        timezone: data.time_zone?.name,
        isp: data.asn?.name,
        org: data.asn?.name,
        as: data.asn?.asn,
      })
    },
  ];

  // Запускаем все geo API параллельно
  const promises = geoApis.map(api =>
    fetch(api.url, {
      signal: AbortSignal.timeout(3000)
    })
      .then(res => res.json())
      .then(data => {
        const geoData = api.parse(data);
        console.log(`✅ ${api.name}: успех`);
        return geoData;
      })
      .catch(err => {
        console.log(`⚠️ ${api.name}: failed`);
        return null;
      })
  );

  const results = await Promise.all(promises);

  // Возвращаем первый успешный результат
  for (const data of results) {
    if (data) {
      return data;
    }
  }

  return undefined;
}

/**
 * Выбор основного IP из списка
 */
export function getPrimaryIP(ipInfo: IPInfo): string {
  // Приоритет: публичный IPv4 > публичный IPv6 > локальный IP
  if (ipInfo.ipv4.length > 0) {
    return ipInfo.ipv4[0];
  }
  if (ipInfo.ipv6.length > 0) {
    return ipInfo.ipv6[0];
  }
  if (ipInfo.localIP.length > 0) {
    return ipInfo.localIP[0];
  }
  return 'Unknown';
}

/**
 * 🚀 FAST MODE - Сверхбыстрое получение IP для первой загрузки
 * Использует только Google STUN + 1 быстрый API
 * Время: ~2-3 секунды вместо 5-8
 */
export async function getIPSuperFast(): Promise<{ ip: string; ipInfo: IPInfo }> {
  console.log('🚀🚀🚀 SUPER FAST MODE - первая загрузка!');
  
  const ipInfo: IPInfo = {
    ipv4: [],
    ipv6: [],
    localIP: [],
    webrtcLeaked: []
  };

  // Запускаем WebRTC в FAST MODE (3 соединения, только Google STUN, 3 секунды)
  const webrtcPromise = findIPAddresses((ip) => {
    console.log('⚡ FAST IP:', ip);
    
    if (!ipInfo.webrtcLeaked.includes(ip)) {
      ipInfo.webrtcLeaked.push(ip);
    }

    if (ip.includes(':')) {
      if (!ipInfo.ipv6.includes(ip)) ipInfo.ipv6.push(ip);
    } else if (ip.includes('.')) {
      if (ip.startsWith('192.168.') || ip.startsWith('10.') || 
          ip.startsWith('172.') || ip.startsWith('127.')) {
        if (!ipInfo.localIP.includes(ip)) ipInfo.localIP.push(ip);
      } else {
        if (!ipInfo.ipv4.includes(ip)) ipInfo.ipv4.push(ip);
      }
    }
  }, true); // true = FAST MODE

  // Запускаем ОДИН быстрый API (ipify - самый быстрый)
  const fastAPI = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const response = await fetch('https://api.ipify.org?format=json', { 
        signal: controller.signal 
      });
      clearTimeout(timeoutId);
      const data = await response.json();
      return data.ip || '';
    } catch {
      return '';
    }
  };

  // Ждем оба параллельно
  const [_, apiIP] = await Promise.all([webrtcPromise, fastAPI()]);
  
  let primaryIP = getPrimaryIP(ipInfo);
  
  if (primaryIP === 'Unknown' && apiIP) {
    primaryIP = apiIP;
    if (!ipInfo.ipv4.includes(apiIP) && !ipInfo.ipv6.includes(apiIP)) {
      if (apiIP.includes(':')) {
        ipInfo.ipv6.push(apiIP);
      } else {
        ipInfo.ipv4.push(apiIP);
      }
    }
  }
  
  console.log('⚡ SUPER FAST IP получен:', primaryIP);
  return { ip: primaryIP, ipInfo };
}

/**
 * Быстрое получение IP (WebRTC + API fallback)
 * ПОЛНЫЙ режим - все соединения и API
 */
export async function getIPFast(): Promise<{ ip: string; ipInfo: IPInfo }> {
  console.log('🚀 Начинаем быстрое получение IP...');
  
  const android10 = isAndroid10Plus();
  const android11 = isAndroid11Plus();
  
  if (android10) {
    console.log(`📱 Android ${getAndroidVersion()} обнаружен - Extreme Mode активирован!`);
  }
  
  // Запускаем WebRTC и API параллельно
  const [ipInfo, apiIP] = await Promise.all([
    getRealIPAddress(),
    getIPFromAPI()
  ]);
  
  let primaryIP = getPrimaryIP(ipInfo);
  
  // Если WebRTC не дал публичный IP, используем API
  if (primaryIP === 'Unknown' && apiIP) {
    primaryIP = apiIP;
    // Добавляем API IP в список
    if (!ipInfo.ipv4.includes(apiIP) && !ipInfo.ipv6.includes(apiIP)) {
      if (apiIP.includes(':')) {
        ipInfo.ipv6.push(apiIP);
      } else {
        ipInfo.ipv4.push(apiIP);
      }
    }
  }
  
  console.log('📍 Primary IP:', primaryIP);
  return { ip: primaryIP, ipInfo };
}

/**
 * Получить информацию о пользователе
 */
export function getUserInfo() {
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screenResolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timestamp: new Date().toISOString()
  };
}