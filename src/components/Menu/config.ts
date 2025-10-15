import { MenuEntry } from '@pancakeswap-libs/uikit';

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
  label: 'Burn',
  icon: 'MoonIcon', // 🔥 or any custom icon
  href: '/burn',
  },
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Explorer',
        href: 'https://explorer.phantasma.info/en/token?id=BOO',
      },
    ],
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Github',
        href: 'https://github.com/damaniac666/',
      },
    ],
  },
];

export default config;