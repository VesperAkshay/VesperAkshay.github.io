export interface WallpaperItem {
  id: string
  name: string
  category: 'F1 Racing' | 'Flowers' | 'Clouds & Sky' | 'Aesthetic' | 'macOS Official' | 'OS Wallpapers'
  url: string
  thumbnail: string
  aspect?: string
}

export const WALLPAPERS: WallpaperItem[] = [
  // OS Official
  {
    id: 'sequoia-dark',
    name: 'macOS Sequoia (Dark 4K)',
    category: 'OS Wallpapers',
    url: '/wallpapers/sequoia-dark.jpg',
    thumbnail: '/wallpapers/sequoia-dark.jpg',
  },
  {
    id: 'sequoia-light',
    name: 'macOS Sequoia (Light 4K)',
    category: 'OS Wallpapers',
    url: '/wallpapers/sequoia-light.jpg',
    thumbnail: '/wallpapers/sequoia-light.jpg',
  },
  {
    id: 'windows-bloom',
    name: 'Windows 11 Bloom (Light 4K)',
    category: 'OS Wallpapers',
    url: '/wallpapers/windows-bloom.jpg',
    thumbnail: '/wallpapers/windows-bloom.jpg',
  },
  {
    id: 'windows-dark',
    name: 'Windows 11 Bloom (Dark 4K)',
    category: 'OS Wallpapers',
    url: '/wallpapers/windows-dark.jpg',
    thumbnail: '/wallpapers/windows-dark.jpg',
  },
  {
    id: 'ubuntu-aubergine',
    name: 'Ubuntu Linux Aubergine (4K)',
    category: 'OS Wallpapers',
    url: '/wallpapers/ubuntu-aubergine.jpg',
    thumbnail: '/wallpapers/ubuntu-aubergine.jpg',
  },
  {
    id: 'android-material',
    name: 'Android 15 Material You (4K)',
    category: 'OS Wallpapers',
    url: '/wallpapers/android-material.png',
    thumbnail: '/wallpapers/android-material.png',
  },

  // F1 Racing
  {
    id: 'f1-red-bull',
    name: 'Formula 1 Night Circuit',
    category: 'F1 Racing',
    url: '/wallpapers/f1-red-bull.jpg',
    thumbnail: '/wallpapers/f1-red-bull.jpg',
  },
  {
    id: 'f1-speed',
    name: 'Monaco GP Apex',
    category: 'F1 Racing',
    url: '/wallpapers/f1-speed.jpg',
    thumbnail: '/wallpapers/f1-speed.jpg',
  },
  {
    id: 'f1-cockpit',
    name: 'Motorsport Aerodynamics',
    category: 'F1 Racing',
    url: '/wallpapers/f1-cockpit.jpg',
    thumbnail: '/wallpapers/f1-cockpit.jpg',
  },
  {
    id: 'f1-ferrari',
    name: 'Scuderia Track Machine',
    category: 'F1 Racing',
    url: '/wallpapers/f1-ferrari.jpg',
    thumbnail: '/wallpapers/f1-ferrari.jpg',
  },

  // Flowers & Botanical
  {
    id: 'dark-peonies',
    name: 'Midnight Peonies',
    category: 'Flowers',
    url: '/wallpapers/dark-peonies.jpg',
    thumbnail: '/wallpapers/dark-peonies.jpg',
  },
  {
    id: 'cherry-blossom',
    name: 'Sakura Petals',
    category: 'Flowers',
    url: '/wallpapers/cherry-blossom.jpg',
    thumbnail: '/wallpapers/cherry-blossom.jpg',
  },
  {
    id: 'lavender-mist',
    name: 'Lavender Bloom',
    category: 'Flowers',
    url: '/wallpapers/lavender-mist.jpg',
    thumbnail: '/wallpapers/lavender-mist.jpg',
  },
  {
    id: 'neon-rose',
    name: 'Cyber Rose Bloom',
    category: 'Flowers',
    url: '/wallpapers/neon-rose.jpg',
    thumbnail: '/wallpapers/neon-rose.jpg',
  },

  // Aesthetic Clouds & Sky
  {
    id: 'golden-clouds',
    name: 'Sunset Cloud Horizon',
    category: 'Clouds & Sky',
    url: '/wallpapers/golden-clouds.jpg',
    thumbnail: '/wallpapers/golden-clouds.jpg',
  },
  {
    id: 'purple-twilight',
    name: 'Violet Twilight Clouds',
    category: 'Clouds & Sky',
    url: '/wallpapers/purple-twilight.jpg',
    thumbnail: '/wallpapers/purple-twilight.jpg',
  },
  {
    id: 'cumulus-dream',
    name: 'Pure Cloudscape',
    category: 'Clouds & Sky',
    url: '/wallpapers/cumulus-dream.jpg',
    thumbnail: '/wallpapers/cumulus-dream.jpg',
  },
  {
    id: 'storm-light',
    name: 'Dramatic Golden Overcast',
    category: 'Clouds & Sky',
    url: '/wallpapers/storm-light.jpg',
    thumbnail: '/wallpapers/storm-light.jpg',
  },

  // Aesthetic & Abstract
  {
    id: 'synthwave-glow',
    name: 'Neon Retro Grid',
    category: 'Aesthetic',
    url: '/wallpapers/synthwave-glow.jpg',
    thumbnail: '/wallpapers/synthwave-glow.jpg',
  },
  {
    id: 'aurora-borealis',
    name: 'Arctic Aurora Night',
    category: 'Aesthetic',
    url: '/wallpapers/aurora-borealis.jpg',
    thumbnail: '/wallpapers/aurora-borealis.jpg',
  },
  {
    id: 'cyber-city',
    name: 'Cyberpunk Metropolis',
    category: 'Aesthetic',
    url: '/wallpapers/cyber-city.jpg',
    thumbnail: '/wallpapers/cyber-city.jpg',
  },
]
