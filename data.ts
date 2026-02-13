
import { Product, Category } from './types';

export const mostSoldProducts: Product[] = [
  {
    id: 'robux-1000',
    name: 'Gift Card Roblox 1000 Robux',
    category: 'Roblox | GLOBAL',
    price: 13990,
    originalPrice: 14990,
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=400&h=250&auto=format&fit=crop',
    description: '1000 Robux para tu cuenta de Roblox.'
  },
  {
    id: 'steam-5',
    name: 'Steam Wallet $5 USD',
    category: 'Steam | GLOBAL',
    price: 6990,
    originalPrice: 7990,
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=400&h=250&auto=format&fit=crop',
    description: '$5 USD para tu cartera de Steam.'
  },
  {
    id: 'xbox-ultimate-1',
    name: 'Xbox Game Pass Ultimate 1 Mes',
    category: 'Xbox | ESTADOS UNIDOS',
    price: 12990,
    originalPrice: 15990,
    image: 'https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?q=80&w=400&h=250&auto=format&fit=crop',
    description: 'Acceso ilimitado a más de 100 juegos de alta calidad.'
  },
  {
    id: 'psn-20',
    name: 'PlayStation Gift Card $20 USD',
    category: 'PlayStation | USA',
    price: 21990,
    originalPrice: 24990,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=400&h=250&auto=format&fit=crop',
    description: 'Carga saldo en tu cuenta PSN.'
  },
  {
    id: 'robux-2000',
    name: 'Gift Card Roblox 2000 Robux',
    category: 'Roblox | GLOBAL',
    price: 25990,
    originalPrice: 28990,
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=400&h=250&auto=format&fit=crop',
    description: '2000 Robux para tu cuenta.'
  },
  {
    id: 'steam-10',
    name: 'Steam Wallet $10 USD',
    category: 'Steam | GLOBAL',
    price: 11990,
    originalPrice: 13990,
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=400&h=250&auto=format&fit=crop',
    description: '$10 USD para Steam.'
  }
];

export const bestPriceProducts: Product[] = [
  {
    id: 'robux-350',
    name: 'Gift Card Roblox 350 Robux',
    category: 'Roblox | GLOBAL',
    price: 6990,
    originalPrice: 8990,
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=400&h=250&auto=format&fit=crop',
    description: '350 Robux para tu cuenta de Roblox.'
  },
  {
    id: 'nintendo-3',
    name: 'Nintendo Switch Online 3 Meses',
    category: 'Nintendo | ESTADOS UNIDOS',
    price: 8490,
    originalPrice: 9990,
    image: 'https://images.unsplash.com/photo-1590234141014-411a2f646039?q=80&w=400&h=250&auto=format&fit=crop',
    description: 'Suscripción de 3 meses para Nintendo Switch Online.'
  },
  {
    id: 'nintendo-12',
    name: 'Nintendo Switch Online 12 Meses',
    category: 'Nintendo | ESTADOS UNIDOS',
    price: 18490,
    originalPrice: 19990,
    image: 'https://images.unsplash.com/photo-1612448332213-39716e254e0b?q=80&w=400&h=250&auto=format&fit=crop',
    description: 'Suscripción de 12 meses para Nintendo Switch Online.'
  }
];

export const robuxDirectos: Product[] = [
  { id: 'rbx-500', name: 'Gift Card Roblox 500 Robux', category: 'Roblox | GLOBAL', price: 50, originalPrice: 9990, image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=400&h=250&auto=format&fit=crop', description: '', isOutOfStock: true },
  { id: 'rbx-100', name: 'Gift Card Roblox 100 Robux', category: 'Roblox | GLOBAL', price: 3990, originalPrice: 5990, image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=400&h=250&auto=format&fit=crop', description: '' },
  { id: 'rbx-350-2', name: 'Gift Card Roblox 350 Robux', category: 'Roblox | GLOBAL', price: 6990, originalPrice: 8990, image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=400&h=250&auto=format&fit=crop', description: '' },
  { id: 'rbx-800-2', name: 'Gift Card Roblox 800 Robux', category: 'Roblox | GLOBAL', price: 11490, originalPrice: 12990, image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=400&h=250&auto=format&fit=crop', description: '' },
  { id: 'rbx-1000-2', name: 'Gift Card Roblox 1000 Robux', category: 'Roblox | GLOBAL', price: 13990, originalPrice: 14990, image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=400&h=250&auto=format&fit=crop', description: '' }
];

export const robuxUsd: Product[] = [
  { id: 'rbx-usd-5', name: 'Roblox Gift Card $5 USD', category: 'Roblox | GLOBAL', price: 5990, originalPrice: 6990, image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=400&h=250&auto=format&fit=crop', description: '' },
  { id: 'rbx-usd-10', name: 'Roblox Gift Card $10 USD', category: 'Roblox | GLOBAL', price: 9940, originalPrice: 10990, image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=400&h=250&auto=format&fit=crop', description: '' },
  { id: 'rbx-usd-15', name: 'Roblox Gift Card $15 USD', category: 'Roblox | GLOBAL', price: 15490, originalPrice: 18990, image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=400&h=250&auto=format&fit=crop', description: '' },
  { id: 'rbx-usd-25', name: 'Roblox Gift Card $25 USD', category: 'Roblox | GLOBAL', price: 24790, originalPrice: 25790, image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=400&h=250&auto=format&fit=crop', description: '' },
  { id: 'rbx-usd-50', name: 'Roblox Gift Card $50 USD', category: 'Roblox | GLOBAL', price: 49990, originalPrice: 52990, image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=400&h=250&auto=format&fit=crop', description: '' },
  { id: 'rbx-usd-100', name: 'Roblox Gift Card $100 USD', category: 'Roblox | GLOBAL', price: 113990, originalPrice: 129990, image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=400&h=250&auto=format&fit=crop', description: '', isOutOfStock: true }
];

export const psnUsa: Product[] = [
  { id: 'psn-10-grid', name: 'Playstation Gift Card $10 USD', category: 'PSN | ESTADOS UNIDOS', price: 9790, originalPrice: 10990, image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=400&h=250&auto=format&fit=crop', description: '' },
  { id: 'psn-20-grid', name: 'Playstation Gift Card $20 USD', category: 'PSN | ESTADOS UNIDOS', price: 21990, originalPrice: 25990, image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=400&h=250&auto=format&fit=crop', description: '' },
  { id: 'psn-25-grid', name: 'Playstation Gift Card $25 USD', category: 'PSN | ESTADOS UNIDOS', price: 25990, originalPrice: 28990, image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=400&h=250&auto=format&fit=crop', description: '' },
  { id: 'psn-50-grid', name: 'Playstation Gift Card $50 USD', category: 'PSN | ESTADOS UNIDOS', price: 45680, originalPrice: 48990, image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=400&h=250&auto=format&fit=crop', description: '' },
  { id: 'psn-75-grid', name: 'Playstation Gift Card $75 USD', category: 'PSN | ESTADOS UNIDOS', price: 73990, originalPrice: 75990, image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=400&h=250&auto=format&fit=crop', description: '', isOutOfStock: true },
  { id: 'psn-100-grid', name: 'Playstation Gift Card $100 USD', category: 'PSN | ESTADOS UNIDOS', price: 99990, originalPrice: 109990, image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=400&h=250&auto=format&fit=crop', description: '', isOutOfStock: true }
];

export const xboxGrid: Product[] = [
  { id: 'xbox-ult-1-grid', name: 'Xbox Game Pass Ultimate 1 Mes', category: 'Xbox | CHILE', price: 10390, originalPrice: 12990, image: 'https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?q=80&w=400&h=250&auto=format&fit=crop', description: '' },
  { id: 'xbox-ult-1-usa', name: 'Xbox Game Pass Ultimate 1 Mes', category: 'Xbox | ESTADOS UNIDOS', price: 12990, originalPrice: 15990, image: 'https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?q=80&w=400&h=250&auto=format&fit=crop', description: '' },
  { id: 'xbox-ult-6-chile', name: 'Xbox Game Pass Ultimate 6 Meses', category: 'Xbox | CHILE', price: 30990, originalPrice: 33990, image: 'https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?q=80&w=400&h=250&auto=format&fit=crop', description: '', isOutOfStock: true },
  { id: 'xbox-35k', name: 'Xbox Gift Card $35.000', category: 'Xbox | CHILE', price: 35000, originalPrice: 35900, image: 'https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?q=80&w=400&h=250&auto=format&fit=crop', description: '', isOutOfStock: true },
  { id: 'xbox-core-12', name: 'Xbox Game Pass Core 12 Meses', category: 'Xbox | CHILE', price: 48990, originalPrice: 49990, image: 'https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?q=80&w=400&h=250&auto=format&fit=crop', description: '', isOutOfStock: true }
];

export const riotGrid: Product[] = [
  { id: 'riot-5', name: 'Riot Access Gift Card $5 USD', category: 'Riot Games | LATAM', price: 5190, originalPrice: 5990, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&h=250&auto=format&fit=crop', description: '' },
  { id: 'riot-10', name: 'Riot Access Gift Card $10 USD', category: 'Riot Games | LATAM', price: 10490, originalPrice: 11990, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&h=250&auto=format&fit=crop', description: '' },
  { id: 'riot-15', name: 'Riot Access Gift Card $15 USD', category: 'Riot Games | LATAM', price: 15890, originalPrice: 18990, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&h=250&auto=format&fit=crop', description: '' },
  { id: 'riot-25', name: 'Riot Access Gift Card $25 USD', category: 'Riot Games | LATAM', price: 25890, originalPrice: 27890, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&h=250&auto=format&fit=crop', description: '' },
  { id: 'riot-50', name: 'Riot Access Gift Card $50 USD', category: 'Riot Games | LATAM', price: 51890, originalPrice: 53990, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&h=250&auto=format&fit=crop', description: '', isOutOfStock: true },
  { id: 'riot-100', name: 'Riot Access Gift Card $100 USD', category: 'Riot Games | LATAM', price: 81990, originalPrice: 89990, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&h=250&auto=format&fit=crop', description: '', isOutOfStock: true }
];

export const steamGrid: Product[] = [
  { id: 'steam-5-grid', name: 'Steam Wallet $5 USD', category: 'Steam | GLOBAL', price: 6990, originalPrice: 7990, image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=400&h=250&auto=format&fit=crop', description: '' },
  { id: 'steam-10-grid', name: 'Steam Wallet $10 USD', category: 'Steam | GLOBAL', price: 12790, originalPrice: 13990, image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=400&h=250&auto=format&fit=crop', description: '' },
  { id: 'steam-15-grid', name: 'Steam Wallet $15 USD', category: 'Steam | GLOBAL', price: 18890, originalPrice: 20990, image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=400&h=250&auto=format&fit=crop', description: '' },
  { id: 'steam-25-grid', name: 'Steam Wallet $25 USD', category: 'Steam | GLOBAL', price: 22990, originalPrice: 25990, image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=400&h=250&auto=format&fit=crop', description: '', isOutOfStock: true },
  { id: 'steam-50-grid', name: 'Steam Wallet $50 USD', category: 'Steam | GLOBAL', price: 55490, originalPrice: 55990, image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=400&h=250&auto=format&fit=crop', description: '', isOutOfStock: true },
  { id: 'steam-100-grid', name: 'Steam Wallet $100 USD', category: 'Steam | GLOBAL', price: 104990, originalPrice: 119990, image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=400&h=250&auto=format&fit=crop', description: '', isOutOfStock: true }
];

export const itunesGrid: Product[] = [
  { id: 'apple-5-grid', name: 'ITunes Gift Card $5 USD', category: 'AppStore | ESTADOS UNIDOS', price: 5990, originalPrice: 6990, image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=400&h=250&auto=format&fit=crop', description: '' },
  { id: 'apple-10-grid', name: 'ITunes Gift Card $10 USD', category: 'AppStore | ESTADOS UNIDOS', price: 10190, originalPrice: 12990, image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=400&h=250&auto=format&fit=crop', description: '' },
  { id: 'apple-15-grid', name: 'ITunes Gift Card $15 USD', category: 'AppStore | ESTADOS UNIDOS', price: 15490, originalPrice: 15990, image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=400&h=250&auto=format&fit=crop', description: '' },
  { id: 'apple-25-grid', name: 'ITunes Gift Card $25 USD', category: 'AppStore | ESTADOS UNIDOS', price: 23990, originalPrice: 25000, image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=400&h=250&auto=format&fit=crop', description: '', isOutOfStock: true },
  { id: 'apple-50-grid', name: 'ITunes Gift Card $50 USD', category: 'AppStore | ESTADOS UNIDOS', price: 51990, originalPrice: 53990, image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=400&h=250&auto=format&fit=crop', description: '', isOutOfStock: true },
  { id: 'apple-100-grid', name: 'ITunes Gift Card $100 USD', category: 'AppStore | ESTADOS UNIDOS', price: 109990, originalPrice: 115990, image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=400&h=250&auto=format&fit=crop', description: '', isOutOfStock: true }
];

export const nintendoGrid: Product[] = [
  { id: 'nintendo-online-3', name: 'Nintendo Switch Online 3 Meses', category: 'Nintendo | ESTADOS UNIDOS', price: 8490, originalPrice: 9990, image: 'https://images.unsplash.com/photo-1590234141014-411a2f646039?q=80&w=400&h=250&auto=format&fit=crop', description: '' },
  { id: 'nintendo-10', name: 'Nintendo Eshop Gift Card $10 USD', category: 'Nintendo | ESTADOS UNIDOS', price: 9290, originalPrice: 12990, image: 'https://images.unsplash.com/photo-1590234141014-411a2f646039?q=80&w=400&h=250&auto=format&fit=crop', description: '' },
  { id: 'nintendo-online-12', name: 'Nintendo Switch Online 12 Meses', category: 'Nintendo | ESTADOS UNIDOS', price: 18490, originalPrice: 19990, image: 'https://images.unsplash.com/photo-1590234141014-411a2f646039?q=80&w=400&h=250&auto=format&fit=crop', description: '' },
  { id: 'nintendo-20-usd', name: 'Nintendo Eshop Gift Card $20 USD', category: 'Nintendo | ESTADOS UNIDOS', price: 19990, originalPrice: 21990, image: 'https://images.unsplash.com/photo-1590234141014-411a2f646039?q=80&w=400&h=250&auto=format&fit=crop', description: '' },
  { id: 'nintendo-35', name: 'Nintendo Eshop Gift Card $35 USD', category: 'Nintendo | ESTADOS UNIDOS', price: 34990, originalPrice: 37990, image: 'https://images.unsplash.com/photo-1590234141014-411a2f646039?q=80&w=400&h=250&auto=format&fit=crop', description: '' },
  { id: 'nintendo-50-usd', name: 'Nintendo Eshop Gift Card $50 USD', category: 'Nintendo | ESTADOS UNIDOS', price: 49990, originalPrice: 51990, image: 'https://images.unsplash.com/photo-1590234141014-411a2f646039?q=80&w=400&h=250&auto=format&fit=crop', description: '', isOutOfStock: true },
  { id: 'nintendo-70', name: 'Nintendo Eshop Gift Card $70 USD', category: 'Nintendo | ESTADOS UNIDOS', price: 71990, originalPrice: 80990, image: 'https://images.unsplash.com/photo-1590234141014-411a2f646039?q=80&w=400&h=250&auto=format&fit=crop', description: '', isOutOfStock: true }
];

export const products: Product[] = [...mostSoldProducts, ...bestPriceProducts, ...robuxDirectos, ...robuxUsd, ...psnUsa, ...xboxGrid, ...riotGrid, ...steamGrid, ...itunesGrid, ...nintendoGrid];
