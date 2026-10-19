// Mock data — untuk preview sebelum Supabase aktif.
// Nanti ketika mockMode = false, data diambil dari Supabase.

export const mockPlayer = {
  id: 'ADVAN',
  name: 'ADVAN',
  avatar: 'https://mplstatic.com/avatars/b98a727e0b490619d96855788a47d410.jpg?1788961460',
  country: 'Maldives',
  countryCode: 'MV',
  region: 'Krsko',
  level: 29,
  xp: 11810,
  xpMax: 16091,
  energy: 62.41,
  health: 95.0,
  gold: 360.72,
  euro: 0.03,
  svct: 106.95,
  ruf: 0.00,
  activeWar: true,
  medalsProgress: 63.4,
};

export const mockCompanies = [
  { id: 34704, name: '⏪♻closeup #1♻⏩', type: 'Newspaper', icon: 'newspaper', color: 'pink', gold: 10.94, local: { code: 'IDR', val: 363.22, flag: 'id' } },
  { id: 37852, name: '⏪♻closeup #2♻⏩', type: 'Newspaper', icon: 'newspaper', color: 'yellow', gold: 1.00, local: { code: 'IDR', val: 96.17, flag: 'id' } },
  { id: 47692, name: 'ADVAN - Solar Panel Farm', type: 'Solar Panel Farm', icon: 'solar-panel-farm', color: 'linen', gold: 64.94, local: { code: 'LEU', val: 0, flag: 'md' } },
  { id: 22033, name: '⏪♻closeup #3♻⏩', type: 'Newspaper', icon: 'newspaper', color: 'linen', gold: 0.00, local: { code: 'IDR', val: 56.92, flag: 'id' } },
  { id: 53359, name: '🌹ADVAN🌹 - Clothes Factory', type: 'Clothes Factory', icon: 'clothes-factory', color: 'cyan', gold: 1.55, local: { code: 'ARS', val: 18.47, flag: 'ar' } },
  { id: 49684, name: '🌹ADVAN🌹 - Recycling Center', type: 'Recycling Center', icon: 'recycling-center', color: 'cyan', gold: 0.37, local: { code: 'ESP', val: 55.61, flag: 'es' } },
  { id: 51097, name: '🌹ADVAN🌹 - Milk and Coffee Shop', type: 'Milk and Coffee Shop', icon: 'milk-and-coffee-shop', color: 'pink', gold: 7.76, local: { code: 'LEU', val: 19.21, flag: 'md' } },
  { id: 39637, name: '🌹ADVAN🌹 - Attack Weapons Factory', type: 'Attack Weapons Factory', icon: 'attack-weapons-factory', color: 'pink', gold: 4.75, local: { code: 'CLP', val: 66.07, flag: 'cl' } },
];

export const mockFriends = [
  { id: 'julienoor', name: 'julienoor', status: 'online', flag: 'mc' },
  { id: 'Nicotin', name: 'Nicotin', status: 'online', flag: 'mv' },
  { id: 'kurniawan214', name: 'kurniawan214', status: 'idle', flag: 'tw' },
  { id: 'Tedong_Naga819', name: 'Tedong_Naga819', status: 'idle', flag: 'fo' },
  { id: 'Reingkarnasi', name: 'Reingkarnasi', status: 'idle', flag: 'mc' },
  { id: 'Dingdong', name: 'Dingdong', status: 'idle', flag: 'ad' },
  { id: 'archameera', name: 'archameera', status: 'idle', flag: 'sv' },
  { id: 'Phoenix', name: 'Phoenix', status: 'idle', flag: 'eh' },
];

export const mockShouts = [
  { text: 'Macedonia active work and war, wts general castle inside Macedonia', by: 'chandra6682', flag: 'mk', time: '2 days ago' },
  { text: 'Really cheap energy from my old Canadian newspaper articles. Select Canada from the newspapers list, go to the last page and scroll backwards.', by: 'Castoricescu', flag: 'cz', time: '4 days ago' },
  { text: 'New Zealand open for two new workers. good salary cheap meals and food', by: 'evelmoney', flag: 'nz', time: '5 days ago' },
  { text: 'I am buying coffee plantation. Please send me your offert in private message.', by: 'matrix', flag: 'ec', time: '1 week ago' },
];

export const mockActivity = [
  { icon: 'fa-briefcase',    text: 'Worked at <b>Solar Panel Farm</b>', time: '2m ago' },
  { icon: 'fa-coins',        text: 'Collected <b>+12.5 Gold</b> from companies', time: '18m ago' },
  { icon: 'fa-crosshairs',   text: 'Attacked region <b>Krsko</b> — dealt <b>1,240 damage</b>', time: '1h ago' },
  { icon: 'fa-star',         text: 'Earned <b>Daily Hero</b> bonus', time: '3h ago' },
  { icon: 'fa-newspaper',    text: 'Published article in <b>⏪♻closeup #1</b>', time: '5h ago' },
];

export const mockWars = [
  { id: 98189, attacker: 'Maldives', defender: 'Krsko', damage: '12.4M', status: 'active' },
  { id: 98180, attacker: 'Monaco',   defender: 'Corsica', damage: '8.1M',  status: 'active' },
];
