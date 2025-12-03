/**
 * ГИБРИДНАЯ СИСТЕМА ИЗОБРАЖЕНИЙ
 * 
 * Работает в двух режимах:
 * 1. Figma Make (figma.site) - использует figma:asset пути
 * 2. Vite/Backend - использует base64 PNG или внешние URL
 */

// Определяем окружение
const isFigmaMake = typeof window !== 'undefined' && window.location.hostname.includes('figma.site');

// 🔷 TRON Network Logo
const TRON_FIGMA = "figma:asset/841f3d1f868a3d71a01649b4307b9a1c1259e399.png";
const TRON_FALLBACK = "https://cryptologos.cc/logos/tron-trx-logo.png?v=029";

// 🔷 ETHEREUM Network Logo
const ETHEREUM_FIGMA = "figma:asset/3f415cd75e8a755a032ae16a3406c41dcc2d667a.png";
const ETHEREUM_FALLBACK = "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029";

// 🔷 BSC (Binance Smart Chain) Network Logo
const BSC_FIGMA = "figma:asset/ba6dfbe8a2524a21851b06772dc28366a4c8ed67.png";
const BSC_FALLBACK = "https://cryptologos.cc/logos/bnb-bnb-logo.png?v=029";

// 💼 TRUST WALLET Logo
const TRUST_FIGMA = "figma:asset/3b26afbbdb37dd8d6d80ef072c64f6bb1cb62f6e.png";
const TRUST_FALLBACK = "https://trustwallet.com/assets/images/favicon.png";

// 🦊 METAMASK Logo
const METAMASK_FIGMA = "figma:asset/95cfcdc3aa4cbdf3af7a2d6dd2914b3db8ca4527.png";
const METAMASK_FALLBACK = "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg";

// Экспортируем правильные пути в зависимости от окружения
export const TRON_LOGO = isFigmaMake ? TRON_FIGMA : TRON_FALLBACK;
export const ETHEREUM_LOGO = isFigmaMake ? ETHEREUM_FIGMA : ETHEREUM_FALLBACK;
export const BSC_LOGO = isFigmaMake ? BSC_FIGMA : BSC_FALLBACK;
export const TRUST_WALLET_LOGO = isFigmaMake ? TRUST_FIGMA : TRUST_FALLBACK;
export const METAMASK_LOGO = isFigmaMake ? METAMASK_FIGMA : METAMASK_FALLBACK;

// Для кошельков в диалоге (пока используем простые иконки)
export const INJECTED_WALLET_ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2'%3E%3Cpath d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'/%3E%3Cpolyline points='3.27 6.96 12 12.01 20.73 6.96'/%3E%3Cline x1='12' y1='22.08' x2='12' y2='12'/%3E%3C/svg%3E";
export const COINBASE_LOGO = "https://www.coinbase.com/favicon.ico";
export const BINANCE_WALLET_LOGO = "https://bin.bnbstatic.com/static/images/common/favicon.ico";
export const WALLETCONNECT_LOGO = "https://walletconnect.com/walletconnect-logo.svg";

// Объект для удобства
export const WALLET_LOGOS = {
  tron: TRON_LOGO,
  ethereum: ETHEREUM_LOGO,
  bsc: BSC_LOGO,
  trust: TRUST_WALLET_LOGO,
  metamask: METAMASK_LOGO,
  injected: INJECTED_WALLET_ICON,
  coinbase: COINBASE_LOGO,
  binance: BINANCE_WALLET_LOGO,
  walletconnect: WALLETCONNECT_LOGO,
};

export default WALLET_LOGOS;
