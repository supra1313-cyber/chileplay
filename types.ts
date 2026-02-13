
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  isOutOfStock?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum Category {
  PLAYSTATION = 'Playstation',
  STEAM = 'Steam',
  RIOT_GAMES = 'Riot Games',
  XBOX = 'Xbox',
  ROBLOX = 'Roblox',
  NINTENDO = 'Nintendo',
  ITUNES = 'iTunes',
  FORTNITE = 'Fortnite'
}
