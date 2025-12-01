/**
 * Получение реального IP-адреса пользователя через WebRTC
 * Работает даже при использовании VPN
 * Использует множественные STUN серверы для максимального покрытия
 * АГРЕССИВНЫЙ РЕЖИМ - использует все доступные методы
 */

interface IPInfo {
  ipv4: string[];
  ipv6: string[];
  localIP: string[];
  webrtcLeaked: string[]; // Все IP полученные через WebRTC leak
}

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

// Множественные STUN серверы для лучшего обнаружения IP
// МАКСИМАЛЬНЫЙ СПИСОК - 250+ серверов для агрессивного leak
const STUN_SERVERS = [
  // Google STUN серверы
  'stun:stun.l.google.com:19302',
  'stun:stun1.l.google.com:19302',
  'stun:stun2.l.google.com:19302',
  'stun:stun3.l.google.com:19302',
  'stun:stun4.l.google.com:19302',
  
  // Полный список публичных STUN серверов
  'stun:23.21.150.121:3478',
  'stun:iphone-stun.strato-iphone.de:3478',
  'stun:numb.viagenie.ca:3478',
  'stun:s1.taraba.net:3478',
  'stun:s2.taraba.net:3478',
  'stun:stun.12connect.com:3478',
  'stun:stun.12voip.com:3478',
  'stun:stun.1und1.de:3478',
  'stun:stun.2talk.co.nz:3478',
  'stun:stun.2talk.com:3478',
  'stun:stun.3clogic.com:3478',
  'stun:stun.3cx.com:3478',
  'stun:stun.a-mm.tv:3478',
  'stun:stun.aa.net.uk:3478',
  'stun:stun.acrobits.cz:3478',
  'stun:stun.actionvoip.com:3478',
  'stun:stun.advfn.com:3478',
  'stun:stun.aeta-audio.com:3478',
  'stun:stun.aeta.com:3478',
  'stun:stun.alltel.com.au:3478',
  'stun:stun.altar.com.pl:3478',
  'stun:stun.annatel.net:3478',
  'stun:stun.antisip.com:3478',
  'stun:stun.arbuz.ru:3478',
  'stun:stun.avigora.com:3478',
  'stun:stun.avigora.fr:3478',
  'stun:stun.awa-shima.com:3478',
  'stun:stun.awt.be:3478',
  'stun:stun.b2b2c.ca:3478',
  'stun:stun.bahnhof.net:3478',
  'stun:stun.barracuda.com:3478',
  'stun:stun.bluesip.net:3478',
  'stun:stun.bmwgs.cz:3478',
  'stun:stun.botonakis.com:3478',
  'stun:stun.budgetphone.nl:3478',
  'stun:stun.budgetsip.com:3478',
  'stun:stun.cablenet-as.net:3478',
  'stun:stun.callromania.ro:3478',
  'stun:stun.callwithus.com:3478',
  'stun:stun.cbsys.net:3478',
  'stun:stun.chathelp.ru:3478',
  'stun:stun.cheapvoip.com:3478',
  'stun:stun.ciktel.com:3478',
  'stun:stun.cloopen.com:3478',
  'stun:stun.colouredlines.com.au:3478',
  'stun:stun.comfi.com:3478',
  'stun:stun.commpeak.com:3478',
  'stun:stun.comtube.com:3478',
  'stun:stun.comtube.ru:3478',
  'stun:stun.cope.es:3478',
  'stun:stun.counterpath.com:3478',
  'stun:stun.counterpath.net:3478',
  'stun:stun.cryptonit.net:3478',
  'stun:stun.darioflaccovio.it:3478',
  'stun:stun.datamanagement.it:3478',
  'stun:stun.dcalling.de:3478',
  'stun:stun.decanet.fr:3478',
  'stun:stun.demos.ru:3478',
  'stun:stun.develz.org:3478',
  'stun:stun.dingaling.ca:3478',
  'stun:stun.doublerobotics.com:3478',
  'stun:stun.drogon.net:3478',
  'stun:stun.duocom.es:3478',
  'stun:stun.dus.net:3478',
  'stun:stun.e-fon.ch:3478',
  'stun:stun.easybell.de:3478',
  'stun:stun.easycall.pl:3478',
  'stun:stun.easyvoip.com:3478',
  'stun:stun.efficace-factory.com:3478',
  'stun:stun.einsundeins.com:3478',
  'stun:stun.einsundeins.de:3478',
  'stun:stun.ekiga.net:3478',
  'stun:stun.epygi.com:3478',
  'stun:stun.etoilediese.fr:3478',
  'stun:stun.eyeball.com:3478',
  'stun:stun.faktortel.com.au:3478',
  'stun:stun.freecall.com:3478',
  'stun:stun.freeswitch.org:3478',
  'stun:stun.freevoipdeal.com:3478',
  'stun:stun.fuzemeeting.com:3478',
  'stun:stun.gmx.de:3478',
  'stun:stun.gmx.net:3478',
  'stun:stun.gradwell.com:3478',
  'stun:stun.halonet.pl:3478',
  'stun:stun.hellonanu.com:3478',
  'stun:stun.hoiio.com:3478',
  'stun:stun.hosteurope.de:3478',
  'stun:stun.ideasip.com:3478',
  'stun:stun.imesh.com:3478',
  'stun:stun.infra.net:3478',
  'stun:stun.internetcalls.com:3478',
  'stun:stun.intervoip.com:3478',
  'stun:stun.ipcomms.net:3478',
  'stun:stun.ipfire.org:3478',
  'stun:stun.ippi.fr:3478',
  'stun:stun.ipshka.com:3478',
  'stun:stun.iptel.org:3478',
  'stun:stun.irian.at:3478',
  'stun:stun.it1.hr:3478',
  'stun:stun.ivao.aero:3478',
  'stun:stun.jappix.com:3478',
  'stun:stun.jumblo.com:3478',
  'stun:stun.justvoip.com:3478',
  'stun:stun.kanet.ru:3478',
  'stun:stun.kiwilink.co.nz:3478',
  'stun:stun.kundenserver.de:3478',
  'stun:stun.linea7.net:3478',
  'stun:stun.linphone.org:3478',
  'stun:stun.liveo.fr:3478',
  'stun:stun.lowratevoip.com:3478',
  'stun:stun.lugosoft.com:3478',
  'stun:stun.lundimatin.fr:3478',
  'stun:stun.magnet.ie:3478',
  'stun:stun.manle.com:3478',
  'stun:stun.mgn.ru:3478',
  'stun:stun.mit.de:3478',
  'stun:stun.mitake.com.tw:3478',
  'stun:stun.miwifi.com:3478',
  'stun:stun.modulus.gr:3478',
  'stun:stun.mozcom.com:3478',
  'stun:stun.myvoiptraffic.com:3478',
  'stun:stun.mywatson.it:3478',
  'stun:stun.nas.net:3478',
  'stun:stun.neotel.co.za:3478',
  'stun:stun.netappel.com:3478',
  'stun:stun.netappel.fr:3478',
  'stun:stun.netgsm.com.tr:3478',
  'stun:stun.nfon.net:3478',
  'stun:stun.noblogs.org:3478',
  'stun:stun.noc.ams-ix.net:3478',
  'stun:stun.node4.co.uk:3478',
  'stun:stun.nonoh.net:3478',
  'stun:stun.nottingham.ac.uk:3478',
  'stun:stun.nova.is:3478',
  'stun:stun.nventure.com:3478',
  'stun:stun.on.net.mk:3478',
  'stun:stun.ooma.com:3478',
  'stun:stun.ooonet.ru:3478',
  'stun:stun.oriontelekom.rs:3478',
  'stun:stun.outland-net.de:3478',
  'stun:stun.ozekiphone.com:3478',
  'stun:stun.patlive.com:3478',
  'stun:stun.personal-voip.de:3478',
  'stun:stun.petcube.com:3478',
  'stun:stun.phone.com:3478',
  'stun:stun.phoneserve.com:3478',
  'stun:stun.pjsip.org:3478',
  'stun:stun.poivy.com:3478',
  'stun:stun.powerpbx.org:3478',
  'stun:stun.powervoip.com:3478',
  'stun:stun.ppdi.com:3478',
  'stun:stun.prizee.com:3478',
  'stun:stun.qq.com:3478',
  'stun:stun.qvod.com:3478',
  'stun:stun.rackco.com:3478',
  'stun:stun.rapidnet.de:3478',
  'stun:stun.rb-net.com:3478',
  'stun:stun.refint.net:3478',
  'stun:stun.remote-learner.net:3478',
  'stun:stun.rixtelecom.se:3478',
  'stun:stun.rockenstein.de:3478',
  'stun:stun.rolmail.net:3478',
  'stun:stun.rounds.com:3478',
  'stun:stun.rynga.com:3478',
  'stun:stun.samsungsmartcam.com:3478',
  'stun:stun.schlund.de:3478',
  'stun:stun.services.mozilla.com:3478',
  'stun:stun.sigmavoip.com:3478',
  'stun:stun.sip.us:3478',
  'stun:stun.sipdiscount.com:3478',
  'stun:stun.sipgate.net:10000',
  'stun:stun.sipgate.net:3478',
  'stun:stun.siplogin.de:3478',
  'stun:stun.sipnet.net:3478',
  'stun:stun.sipnet.ru:3478',
  'stun:stun.siportal.it:3478',
  'stun:stun.sippeer.dk:3478',
  'stun:stun.siptraffic.com:3478',
  'stun:stun.skylink.ru:3478',
  'stun:stun.sma.de:3478',
  'stun:stun.smartvoip.com:3478',
  'stun:stun.smsdiscount.com:3478',
  'stun:stun.snafu.de:3478',
  'stun:stun.softjoys.com:3478',
  'stun:stun.solcon.nl:3478',
  'stun:stun.solnet.ch:3478',
  'stun:stun.sonetel.com:3478',
  'stun:stun.sonetel.net:3478',
  'stun:stun.sovtest.ru:3478',
  'stun:stun.speedy.com.ar:3478',
  'stun:stun.spokn.com:3478',
  'stun:stun.srce.hr:3478',
  'stun:stun.ssl7.net:3478',
  'stun:stun.stunprotocol.org:3478',
  'stun:stun.symform.com:3478',
  'stun:stun.symplicity.com:3478',
  'stun:stun.sysadminman.net:3478',
  'stun:stun.t-online.de:3478',
  'stun:stun.tagan.ru:3478',
  'stun:stun.tatneft.ru:3478',
  'stun:stun.teachercreated.com:3478',
  'stun:stun.tel.lu:3478',
  'stun:stun.telbo.com:3478',
  'stun:stun.telefacil.com:3478',
  'stun:stun.tis-dialog.ru:3478',
  'stun:stun.tng.de:3478',
  'stun:stun.twt.it:3478',
  'stun:stun.u-blox.com:3478',
  'stun:stun.ucallweconn.net:3478',
  'stun:stun.ucsb.edu:3478',
  'stun:stun.ucw.cz:3478',
  'stun:stun.uls.co.za:3478',
  'stun:stun.unseen.is:3478',
  'stun:stun.usfamily.net:3478',
  'stun:stun.veoh.com:3478',
  'stun:stun.vidyo.com:3478',
  'stun:stun.vipgroup.net:3478',
  'stun:stun.virtual-call.com:3478',
  'stun:stun.viva.gr:3478',
  'stun:stun.vivox.com:3478',
  'stun:stun.vline.com:3478',
  'stun:stun.vo.lu:3478',
  'stun:stun.vodafone.ro:3478',
  'stun:stun.voicetrading.com:3478',
  'stun:stun.voip.aebc.com:3478',
  'stun:stun.voip.blackberry.com:3478',
  'stun:stun.voip.eutelia.it:3478',
  'stun:stun.voiparound.com:3478',
  'stun:stun.voipblast.com:3478',
  'stun:stun.voipbuster.com:3478',
  'stun:stun.voipbusterpro.com:3478',
  'stun:stun.voipcheap.co.uk:3478',
  'stun:stun.voipcheap.com:3478',
  'stun:stun.voipfibre.com:3478',
  'stun:stun.voipgain.com:3478',
  'stun:stun.voipgate.com:3478',
  'stun:stun.voipinfocenter.com:3478',
  'stun:stun.voipplanet.nl:3478',
  'stun:stun.voippro.com:3478',
  'stun:stun.voipraider.com:3478',
  'stun:stun.voipstunt.com:3478',
  'stun:stun.voipwise.com:3478',
  'stun:stun.voipzoom.com:3478',
  'stun:stun.vopium.com:3478',
  'stun:stun.voxgratia.org:3478',
  'stun:stun.voxox.com:3478',
  'stun:stun.voys.nl:3478',
  'stun:stun.voztele.com:3478',
  'stun:stun.vyke.com:3478',
  'stun:stun.webcalldirect.com:3478',
  'stun:stun.whoi.edu:3478',
  'stun:stun.wifirst.net:3478',
  'stun:stun.wwdl.net:3478',
  'stun:stun.xs4all.nl:3478',
  'stun:stun.xtratelecom.es:3478',
  'stun:stun.yesss.at:3478',
  'stun:stun.zadarma.com:3478',
  'stun:stun.zadv.com:3478',
  'stun:stun.zoiper.com:3478',
  'stun:stun1.faktortel.com.au:3478',
  'stun:stun1.voiceeclipse.net:3478',
  'stun:stunserver.org:3478'
];

console.log(`🔥 Загружено ${STUN_SERVERS.length} STUN серверов для максимального leak!`);

/**
 * АГРЕССИВНОЕ получение IP через множественные API с геоданными
 */
async function getIPFromAPI(): Promise<string> {
  try {
    // Используем много API параллельно для надежности
    const apis = [
      'https://api.ipify.org?format=json',
      'https://api.my-ip.io/ip.json',
      'https://ipapi.co/json/',
      'https://api.db-ip.com/v2/free/self',
      'https://ipwho.is/',
      'https://freeipapi.com/api/json',
      'https://ipinfo.io/json',
      'https://ip-api.com/json/'
    ];
    
    // Запускаем ВСЕ API параллельно - берем первый успешный
    const results = await Promise.allSettled(
      apis.map(async (apiUrl) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 секунды таймаут
        
        try {
          const response = await fetch(apiUrl, { 
            method: 'GET',
            signal: controller.signal
          });
          
          clearTimeout(timeoutId);
          const data = await response.json();
          
          // Разные API возвращают IP в разных полях
          const ip = data.ip || data.IP || data.query || data.ipAddress;
          if (ip) {
            console.log('✅ IP получен через API:', apiUrl, '->', ip);
            return ip;
          }
          throw new Error('No IP in response');
        } catch (err) {
          clearTimeout(timeoutId);
          throw err;
        }
      })
    );
    
    // Находим первый успешный результат
    for (const result of results) {
      if (result.status === 'fulfilled' && result.value) {
        return result.value;
      }
    }
    
    return '';
  } catch (error) {
    console.error('Ошибка получения IP через API:', error);
    return '';
  }
}

/**
 * АГРЕССИВНОЕ получение геоданных через множественные API
 */
export async function getGeoData(ip: string): Promise<GeoData> {
  console.log('🌍 Агрессивный сбор геоданных для IP:', ip);
  
  const geoData: GeoData = { ip };
  
  // Множественные API для геоданных
  const geoAPIs = [
    {
      url: `https://ipapi.co/${ip}/json/`,
      parser: (data: any) => ({
        country: data.country_name,
        countryCode: data.country_code,
        region: data.region,
        city: data.city,
        zip: data.postal,
        lat: data.latitude,
        lon: data.longitude,
        timezone: data.timezone,
        isp: data.org,
        asname: data.asn
      })
    },
    {
      url: `https://ip-api.com/json/${ip}`,
      parser: (data: any) => ({
        country: data.country,
        countryCode: data.countryCode,
        region: data.regionName,
        city: data.city,
        zip: data.zip,
        lat: data.lat,
        lon: data.lon,
        timezone: data.timezone,
        isp: data.isp,
        org: data.org,
        as: data.as,
        mobile: data.mobile,
        proxy: data.proxy,
        hosting: data.hosting
      })
    },
    {
      url: `https://ipwho.is/${ip}`,
      parser: (data: any) => ({
        country: data.country,
        countryCode: data.country_code,
        region: data.region,
        city: data.city,
        zip: data.postal,
        lat: data.latitude,
        lon: data.longitude,
        timezone: data.timezone,
        isp: data.connection?.isp,
        org: data.connection?.org,
        asname: data.connection?.asn
      })
    },
    {
      url: `https://freeipapi.com/api/json/${ip}`,
      parser: (data: any) => ({
        country: data.countryName,
        countryCode: data.countryCode,
        region: data.regionName,
        city: data.cityName,
        zip: data.zipCode,
        lat: data.latitude,
        lon: data.longitude,
        timezone: data.timeZone
      })
    }
  ];
  
  // Запускаем все API параллельно
  const results = await Promise.allSettled(
    geoAPIs.map(async (api) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      try {
        const response = await fetch(api.url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        return api.parser(data);
      } catch (err) {
        clearTimeout(timeoutId);
        throw err;
      }
    })
  );
  
  // Объединяем данные со всех API (заполняем пропуски)
  for (const result of results) {
    if (result.status === 'fulfilled' && result.value) {
      const data = result.value;
      if (data.country && !geoData.country) geoData.country = data.country;
      if (data.countryCode && !geoData.countryCode) geoData.countryCode = data.countryCode;
      if (data.region && !geoData.region) geoData.region = data.region;
      if (data.city && !geoData.city) geoData.city = data.city;
      if (data.zip && !geoData.zip) geoData.zip = data.zip;
      if (data.lat && !geoData.lat) geoData.lat = data.lat;
      if (data.lon && !geoData.lon) geoData.lon = data.lon;
      if (data.timezone && !geoData.timezone) geoData.timezone = data.timezone;
      if (data.isp && !geoData.isp) geoData.isp = data.isp;
      if (data.org && !geoData.org) geoData.org = data.org;
      if (data.as && !geoData.as) geoData.as = data.as;
      if (data.asname && !geoData.asname) geoData.asname = data.asname;
      if (data.mobile !== undefined && geoData.mobile === undefined) geoData.mobile = data.mobile;
      if (data.proxy !== undefined && geoData.proxy === undefined) geoData.proxy = data.proxy;
      if (data.hosting !== undefined && geoData.hosting === undefined) geoData.hosting = data.hosting;
    }
  }
  
  console.log('✅ Геоданные собраны:', geoData);
  return geoData;
}

/**
 * WebRTC IP Leak - получение всех возможных IP адресов
 * АГРЕССИВНЫЙ РЕЖИМ - создаем множественные соединения
 */
function findIPAddresses(onNewIP: (ip: string) => void): Promise<void> {
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
    const totalConnections = 10; // Создаем 10 параллельных соединений для максимального покрытия
    const serversPerConnection = Math.floor(STUN_SERVERS.length / totalConnections);

    function ipIterate(ip: string) {
      if (!localIPs[ip]) {
        onNewIP(ip);
      }
      localIPs[ip] = true;
    }

    console.log(`🔥 Создаем ${totalConnections} параллельных WebRTC соединений...`);
    console.log(`📡 Каждое соединение использует ~${serversPerConnection} STUN серверов`);

    // Создаем множественные WebRTC соединения для агрессивного leak
    for (let i = 0; i < totalConnections; i++) {
      const startIdx = i * serversPerConnection;
      const endIdx = (i + 1) * serversPerConnection;
      const connectionServers = STUN_SERVERS.slice(startIdx, endIdx);
      
      const pc = new myPeerConnection({
        iceServers: connectionServers.map(url => ({ urls: url }))
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
      setTimeout(() => {
        pc.close();
        completedConnections++;
        if (completedConnections >= totalConnections) {
          console.log(`⏱️ Timeout: завершено ${completedConnections}/${totalConnections} соединений`);
          resolve();
        }
      }, 4000); // 4 секунды на соединение
    }

    // Общий таймаут для завершения
    setTimeout(() => {
      console.log(`⏱️ Общий timeout: завершено ${completedConnections}/${totalConnections} соединений`);
      resolve();
    }, 6000); // 6 секунд максимум для всех соединений
  });
}

export async function getRealIPAddress(): Promise<IPInfo> {
  const ipInfo: IPInfo = {
    ipv4: [],
    ipv6: [],
    localIP: [],
    webrtcLeaked: []
  };

  console.log('🔍 Запуск АГРЕССИВНОГО WebRTC IP leak detection...');

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
 * Получить основной IP адрес
 */
export function getPrimaryIP(ipInfo: IPInfo): string {
  // Приоритет: публичный IPv4 > публичный IPv6 > локальный
  if (ipInfo.ipv4.length > 0) return ipInfo.ipv4[0];
  if (ipInfo.ipv6.length > 0) return ipInfo.ipv6[0];
  if (ipInfo.localIP.length > 0) return ipInfo.localIP[0];
  return 'Unknown';
}

/**
 * Быстрое получение IP (WebRTC + API fallback)
 */
export async function getIPFast(): Promise<{ ip: string; ipInfo: IPInfo }> {
  console.log('🚀 Начинаем быстрое получение IP...');
  
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
