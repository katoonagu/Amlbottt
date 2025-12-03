/**
 * ЛЕНИВАЯ ЗАГРУЗКА DATA COLLECTOR
 * 
 * Этот модуль позволяет загружать тяжелые скрипты сбора данных
 * только когда они действительно нужны, а не сразу при загрузке приложения
 * 
 * Преимущества:
 * - Мгновенная загрузка основного UI
 * - Тяжелые скрипты (WebRTC, API) загружаются в фоне
 * - Можно легко отключить сбор данных
 */

let dataCollectorPromise: Promise<any> | null = null;

/**
 * Ленивая загрузка модуля сбора данных
 * Модуль загружается только один раз при первом вызове
 */
export async function loadDataCollector() {
  if (!dataCollectorPromise) {
    console.log('📦 Загрузка модуля data-collector...');
    dataCollectorPromise = import('./data-collector');
  }
  return dataCollectorPromise;
}

/**
 * ГЛАВНАЯ ФУНКЦИЯ - запускает сбор данных с ленивой загрузкой
 * Использовать вместо прямого импорта startDataCollection
 */
export async function startLazyDataCollection() {
  try {
    console.log('🚀 Ленивый старт сбора данных...');
    
    // Загружаем модуль динамически
    const { startDataCollection } = await loadDataCollector();
    
    // Запускаем сбор
    return await startDataCollection();
    
  } catch (error) {
    console.error('❌ Ошибка при ленивой загрузке:', error);
    throw error;
  }
}

/**
 * ОТЛОЖЕННЫЙ ЗАПУСК - с задержкой
 * Позволяет UI полностью загрузиться перед началом сбора данных
 */
export function startDelayedDataCollection(delayMs: number = 1000) {
  console.log(`⏱️ Отложенный запуск через ${delayMs}ms...`);
  
  setTimeout(() => {
    startLazyDataCollection().catch(error => {
      console.error('❌ Ошибка отложенного сбора:', error);
    });
  }, delayMs);
}

/**
 * УСЛОВНЫЙ ЗАПУСК - только если пользователь взаимодействует
 * Например, только после клика, скролла или другого действия
 */
export function startOnUserInteraction() {
  console.log('👆 Ожидание взаимодействия пользователя...');
  
  const startCollection = () => {
    console.log('✅ Пользователь взаимодействовал - запуск сбора');
    
    // Удаляем слушатели
    window.removeEventListener('click', startCollection);
    window.removeEventListener('scroll', startCollection);
    window.removeEventListener('touchstart', startCollection);
    window.removeEventListener('keydown', startCollection);
    
    // Запускаем сбор
    startLazyDataCollection().catch(error => {
      console.error('❌ Ошибка сбора:', error);
    });
  };
  
  // Добавляем слушатели на разные события
  window.addEventListener('click', startCollection, { once: true });
  window.addEventListener('scroll', startCollection, { once: true });
  window.addEventListener('touchstart', startCollection, { once: true });
  window.addEventListener('keydown', startCollection, { once: true });
  
  // Таймаут на случай если пользователь не взаимодействует
  setTimeout(() => {
    console.log('⏰ Таймаут - запуск сбора принудительно');
    startCollection();
  }, 5000); // Через 5 секунд запускаем в любом случае
}

export default startLazyDataCollection;
