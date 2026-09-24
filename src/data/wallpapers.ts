export interface WallpaperItem {
  id: string
  name: string
  category: 'F1 Racing' | 'Flowers' | 'Clouds & Sky' | 'Aesthetic' | 'macOS Official'
  url: string
  thumbnail: string
  aspect?: string
}

export const WALLPAPERS: WallpaperItem[] = [
  // macOS Official
  {
    id: 'sequoia-dark',
    name: 'macOS Sequoia (Dark 4K)',
    category: 'macOS Official',
    url: '/wallpapers/sequoia-dark.jpg',
    thumbnail: '/wallpapers/sequoia-dark.jpg',
  },
  {
    id: 'sequoia-light',
    name: 'macOS Sequoia (Light 4K)',
    category: 'macOS Official',
    url: '/wallpapers/sequoia-light.jpg',
    thumbnail: '/wallpapers/sequoia-light.jpg',
  },

  // F1 Racing
  {
    id: 'f1-red-bull',
    name: 'Formula 1 Night Circuit',
    category: 'F1 Racing',
    url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=2560&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=75',
  },
  {
    id: 'f1-speed',
    name: 'Monaco GP Apex',
    category: 'F1 Racing',
    url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=2560&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=75',
  },
  {
    id: 'f1-cockpit',
    name: 'Motorsport Aerodynamics',
    category: 'F1 Racing',
    url: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=2560&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=600&q=75',
  },
  {
    id: 'f1-ferrari',
    name: 'Scuderia Track Machine',
    category: 'F1 Racing',
    url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2560&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=75',
  },

  // Flowers & Botanical
  {
    id: 'dark-peonies',
    name: 'Midnight Peonies',
    category: 'Flowers',
    url: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=2560&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=75',
  },
  {
    id: 'cherry-blossom',
    name: 'Sakura Petals',
    category: 'Flowers',
    url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=2560&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=75',
  },
  {
    id: 'lavender-mist',
    name: 'Lavender Bloom',
    category: 'Flowers',
    url: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=2560&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=600&q=75',
  },
  {
    id: 'neon-rose',
    name: 'Cyber Rose Bloom',
    category: 'Flowers',
    url: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=2560&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=75',
  },

  // Aesthetic Clouds & Sky
  {
    id: 'golden-clouds',
    name: 'Sunset Cloud Horizon',
    category: 'Clouds & Sky',
    url: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=2560&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=600&q=75',
  },
  {
    id: 'purple-twilight',
    name: 'Violet Twilight Clouds',
    category: 'Clouds & Sky',
    url: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=2560&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=600&q=75',
  },
  {
    id: 'cumulus-dream',
    name: 'Pure Cloudscape',
    category: 'Clouds & Sky',
    url: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=2560&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=600&q=75',
  },
  {
    id: 'storm-light',
    name: 'Dramatic Golden Overcast',
    category: 'Clouds & Sky',
    url: 'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=2560&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=600&q=75',
  },

  // Aesthetic & Abstract
  {
    id: 'synthwave-glow',
    name: 'Neon Retro Grid',
    category: 'Aesthetic',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=2560&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=75',
  },
  {
    id: 'aurora-borealis',
    name: 'Arctic Aurora Night',
    category: 'Aesthetic',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2560&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=75',
  },
  {
    id: 'cyber-city',
    name: 'Cyberpunk Metropolis',
    category: 'Aesthetic',
    url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2560&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&q=75',
  },
]
