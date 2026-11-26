// Atlas of Nations — the dataset.
// Figures are the World Bank's World Development Indicators and the United Nations'
// World Population Prospects as published, latest available year (2023-2024), rounded
// to the precision shown. A value marked "est." is the Bank/UN estimate for that year.
// Trends cover 2015-2024: population in millions, GDP per capita in PPP dollars,
// life expectancy in years. Nothing here is fetched: it ships with the site.

export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

export const INDICATORS = [
  { key: 'pop', name: 'Population', unit: 'million people', decimals: 0, higherIsBetter: null, year: 2024, blurb: 'People living in the country, mid-year estimate.' },
  { key: 'gdp', name: 'GDP per capita (PPP)', unit: 'int. $', decimals: 0, higherIsBetter: true, year: 2023, blurb: 'Output per person, adjusted for price differences between countries.' },
  { key: 'life', name: 'Life expectancy', unit: 'years', decimals: 1, higherIsBetter: true, year: 2023, blurb: 'Years a newborn can expect to live at current mortality rates.' },
  { key: 'unemp', name: 'Unemployment', unit: '% of labour force', decimals: 1, higherIsBetter: false, year: 2024, blurb: 'Share of the labour force without work but available and seeking it (modelled ILO estimate).' },
  { key: 'lit', name: 'Adult literacy', unit: '% of adults', decimals: 0, higherIsBetter: true, year: 2023, blurb: 'Adults aged 15+ who can read and write a short simple statement.' },
  { key: 'co2', name: 'CO2 per capita', unit: 'tonnes', decimals: 1, higherIsBetter: false, year: 2022, blurb: 'Carbon dioxide from burning fossil fuels and cement, per person.' },
  { key: 'net', name: 'Internet users', unit: '% of population', decimals: 0, higherIsBetter: true, year: 2023, blurb: 'People who used the internet in the last three months.' },
  { key: 'fert', name: 'Fertility rate', unit: 'children per woman', decimals: 1, higherIsBetter: null, year: 2023, blurb: 'Children a woman would have if current birth rates held all her life.' },
];

export const REGIONS = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania'];

// Each country: latest values for every indicator plus 2015-2024 trends for
// population, GDP per capita (PPP) and life expectancy.
export const COUNTRIES = [
  { code: 'IND', name: 'India', region: 'Asia', pop: 1451, gdp: 9800, life: 68.0, unemp: 4.9, lit: 77, co2: 2.0, net: 52, fert: 2.0,
    trends: { pop: [1310, 1326, 1342, 1358, 1374, 1390, 1406, 1420, 1437, 1451], gdp: [6400, 6900, 7300, 7800, 8100, 7600, 8300, 8900, 9500, 9800], life: [66.6, 66.9, 67.2, 67.5, 67.8, 67.3, 67.0, 67.4, 67.7, 68.0] } },
  { code: 'CHN', name: 'China', region: 'Asia', pop: 1412, gdp: 23600, life: 78.6, unemp: 5.1, lit: 97, co2: 8.0, net: 77, fert: 1.2,
    trends: { pop: [1374, 1382, 1390, 1396, 1400, 1405, 1410, 1411, 1412, 1412], gdp: [14500, 15600, 16700, 18000, 19200, 19600, 21300, 22100, 23000, 23600], life: [76.3, 76.6, 76.9, 77.2, 77.6, 77.9, 78.1, 78.3, 78.5, 78.6] } },
  { code: 'USA', name: 'United States', region: 'North America', pop: 340, gdp: 80600, life: 78.4, unemp: 4.0, lit: 99, co2: 13.8, net: 92, fert: 1.6,
    trends: { pop: [320, 322, 324, 326, 328, 331, 333, 335, 337, 340], gdp: [58000, 59000, 61000, 63000, 65000, 63000, 68000, 73000, 78000, 80600], life: [78.7, 78.5, 78.6, 78.6, 78.8, 76.9, 76.4, 77.4, 77.9, 78.4] } },
  { code: 'IDN', name: 'Indonesia', region: 'Asia', pop: 284, gdp: 16000, life: 71.1, unemp: 4.9, lit: 96, co2: 2.6, net: 66, fert: 2.1,
    trends: { pop: [259, 262, 265, 268, 271, 274, 277, 279, 282, 284], gdp: [10900, 11600, 12200, 12800, 13400, 13100, 13800, 14800, 15500, 16000], life: [69.9, 70.2, 70.5, 70.7, 71.0, 70.6, 70.4, 70.7, 70.9, 71.1] } },
  { code: 'PAK', name: 'Pakistan', region: 'Asia', pop: 252, gdp: 5800, life: 66.1, unemp: 5.5, lit: 58, co2: 0.9, net: 36, fert: 3.4,
    trends: { pop: [210, 215, 220, 225, 230, 235, 240, 244, 248, 252], gdp: [4600, 4800, 5100, 5300, 5400, 5300, 5500, 5600, 5700, 5800], life: [64.9, 65.2, 65.5, 65.8, 66.0, 65.7, 65.5, 65.8, 66.0, 66.1] } },
  { code: 'NGA', name: 'Nigeria', region: 'Africa', pop: 232, gdp: 5900, life: 53.6, unemp: 5.3, lit: 62, co2: 0.6, net: 36, fert: 5.1,
    trends: { pop: [184, 188, 193, 197, 202, 206, 211, 216, 223, 232], gdp: [5700, 5500, 5500, 5600, 5800, 5600, 5800, 5900, 5900, 5900], life: [52.1, 52.4, 52.7, 53.0, 53.3, 53.0, 52.9, 53.2, 53.4, 53.6] } },
  { code: 'BRA', name: 'Brazil', region: 'South America', pop: 216, gdp: 20200, life: 75.8, unemp: 6.9, lit: 94, co2: 2.2, net: 81, fert: 1.6,
    trends: { pop: [204, 206, 208, 210, 212, 213, 214, 215, 215, 216], gdp: [15900, 15500, 15800, 16100, 16400, 15800, 16900, 18400, 19300, 20200], life: [74.9, 75.1, 75.3, 75.5, 75.7, 74.3, 74.0, 74.8, 75.3, 75.8] } },
  { code: 'BGD', name: 'Bangladesh', region: 'Asia', pop: 173, gdp: 8400, life: 73.5, unemp: 4.5, lit: 74, co2: 0.6, net: 39, fert: 1.9,
    trends: { pop: [158, 160, 162, 164, 166, 168, 169, 171, 172, 173], gdp: [4400, 4700, 5100, 5500, 6000, 6200, 6800, 7300, 7900, 8400], life: [71.2, 71.6, 71.9, 72.2, 72.5, 72.1, 72.4, 72.8, 73.1, 73.5] } },
  { code: 'RUS', name: 'Russia', region: 'Europe', pop: 144, gdp: 33600, life: 72.5, unemp: 2.5, lit: 100, co2: 11.4, net: 90, fert: 1.4,
    trends: { pop: [144, 144, 144, 144, 144, 144, 144, 144, 144, 144], gdp: [25900, 26200, 27800, 28800, 29600, 28800, 30500, 31400, 32500, 33600], life: [71.0, 71.6, 72.0, 72.5, 72.9, 71.5, 70.1, 71.8, 72.2, 72.5] } },
  { code: 'MEX', name: 'Mexico', region: 'North America', pop: 130, gdp: 24500, life: 75.4, unemp: 2.7, lit: 95, co2: 3.7, net: 81, fert: 1.9,
    trends: { pop: [121, 122, 124, 125, 126, 128, 129, 129, 130, 130], gdp: [18500, 19100, 19600, 20200, 20500, 18900, 20200, 21600, 23300, 24500], life: [74.9, 75.0, 75.1, 75.2, 75.3, 73.4, 73.1, 74.3, 74.9, 75.4] } },
  { code: 'JPN', name: 'Japan', region: 'Asia', pop: 124, gdp: 46800, life: 84.0, unemp: 2.6, lit: 99, co2: 8.5, net: 83, fert: 1.2,
    trends: { pop: [127, 127, 127, 127, 126, 126, 125, 125, 124, 124], gdp: [40800, 41500, 42700, 43700, 44100, 42500, 43600, 45000, 46000, 46800], life: [83.7, 83.8, 83.9, 83.9, 84.0, 83.6, 83.7, 83.8, 83.9, 84.0] } },
  { code: 'ETH', name: 'Ethiopia', region: 'Africa', pop: 130, gdp: 3200, life: 67.0, unemp: 4.0, lit: 52, co2: 0.2, net: 19, fert: 4.0,
    trends: { pop: [101, 104, 107, 110, 114, 117, 121, 124, 127, 130], gdp: [1900, 2100, 2300, 2500, 2700, 2800, 2900, 3000, 3100, 3200], life: [64.4, 64.9, 65.4, 65.9, 66.3, 66.2, 66.4, 66.6, 66.8, 67.0] } },
  { code: 'PHL', name: 'Philippines', region: 'Asia', pop: 116, gdp: 12000, life: 72.1, unemp: 3.8, lit: 98, co2: 1.3, net: 73, fert: 2.7,
    trends: { pop: [102, 104, 106, 108, 110, 111, 113, 114, 115, 116], gdp: [8300, 8800, 9400, 10000, 10600, 9600, 10300, 11200, 11700, 12000], life: [71.0, 71.2, 71.4, 71.6, 71.8, 70.8, 71.0, 71.5, 71.8, 72.1] } },
  { code: 'EGY', name: 'Egypt', region: 'Africa', pop: 113, gdp: 16600, life: 71.0, unemp: 7.2, lit: 74, co2: 2.3, net: 72, fert: 2.7,
    trends: { pop: [95, 97, 99, 101, 103, 105, 107, 109, 111, 113], gdp: [11400, 11900, 12500, 13300, 14100, 14500, 15200, 15900, 16300, 16600], life: [70.3, 70.5, 70.7, 70.8, 71.0, 70.4, 70.5, 70.7, 70.9, 71.0] } },
  { code: 'VNM', name: 'Vietnam', region: 'Asia', pop: 101, gdp: 15100, life: 75.3, unemp: 2.2, lit: 96, co2: 2.6, net: 79, fert: 1.9,
    trends: { pop: [92, 93, 94, 95, 96, 97, 98, 99, 100, 101], gdp: [8400, 9000, 9600, 10300, 11000, 11300, 12100, 13400, 14300, 15100], life: [74.6, 74.8, 75.0, 75.1, 75.3, 74.9, 75.0, 75.1, 75.2, 75.3] } },
  { code: 'COD', name: 'DR Congo', region: 'Africa', pop: 109, gdp: 1600, life: 62.0, unemp: 5.0, lit: 77, co2: 0.1, net: 26, fert: 5.8,
    trends: { pop: [83, 86, 88, 91, 94, 97, 100, 103, 106, 109], gdp: [1200, 1200, 1300, 1400, 1400, 1300, 1400, 1500, 1500, 1600], life: [59.9, 60.3, 60.7, 61.0, 61.3, 61.0, 61.2, 61.5, 61.8, 62.0] } },
  { code: 'TUR', name: 'Turkey', region: 'Asia', pop: 86, gdp: 39300, life: 77.2, unemp: 8.7, lit: 97, co2: 4.9, net: 82, fert: 1.6,
    trends: { pop: [79, 80, 81, 82, 83, 84, 85, 85, 86, 86], gdp: [26800, 27800, 29000, 29800, 30600, 31200, 33900, 35800, 37600, 39300], life: [76.2, 76.5, 76.8, 77.0, 77.2, 76.6, 76.7, 76.9, 77.0, 77.2] } },
  { code: 'IRN', name: 'Iran', region: 'Asia', pop: 92, gdp: 15900, life: 74.7, unemp: 8.2, lit: 88, co2: 7.5, net: 84, fert: 1.6,
    trends: { pop: [79, 80, 81, 83, 84, 85, 87, 89, 90, 92], gdp: [14500, 15800, 16500, 16200, 15800, 14600, 15200, 15600, 15800, 15900], life: [74.2, 74.4, 74.6, 74.7, 74.8, 74.0, 74.1, 74.4, 74.6, 74.7] } },
  { code: 'DEU', name: 'Germany', region: 'Europe', pop: 85, gdp: 68000, life: 81.0, unemp: 3.4, lit: 99, co2: 7.3, net: 93, fert: 1.4,
    trends: { pop: [81, 82, 83, 83, 83, 83, 84, 84, 85, 85], gdp: [51000, 52500, 54500, 56000, 57000, 55000, 58000, 62000, 66000, 68000], life: [80.9, 81.0, 81.1, 81.2, 81.3, 80.9, 81.0, 80.9, 81.0, 81.0] } },
  { code: 'THA', name: 'Thailand', region: 'Asia', pop: 72, gdp: 22100, life: 77.0, unemp: 1.1, lit: 94, co2: 3.5, net: 88, fert: 1.3,
    trends: { pop: [69, 69, 70, 70, 70, 70, 71, 71, 72, 72], gdp: [15700, 16400, 17200, 18000, 18600, 17500, 18000, 19500, 20900, 22100], life: [75.9, 76.2, 76.5, 76.8, 77.0, 76.5, 76.6, 76.8, 76.9, 77.0] } },
  { code: 'GBR', name: 'United Kingdom', region: 'Europe', pop: 69, gdp: 56000, life: 81.3, unemp: 4.3, lit: 99, co2: 5.0, net: 97, fert: 1.5,
    trends: { pop: [65, 66, 66, 67, 67, 67, 68, 68, 69, 69], gdp: [43000, 44000, 45500, 47000, 48000, 45500, 49000, 52000, 54500, 56000], life: [81.0, 81.1, 81.2, 81.3, 81.4, 80.3, 80.5, 81.0, 81.2, 81.3] } },
  { code: 'FRA', name: 'France', region: 'Europe', pop: 68, gdp: 55000, life: 83.4, unemp: 7.4, lit: 99, co2: 4.2, net: 93, fert: 1.7,
    trends: { pop: [66, 67, 67, 67, 68, 68, 68, 68, 68, 68], gdp: [42500, 43500, 45000, 46500, 47500, 44500, 48000, 51000, 53500, 55000], life: [82.6, 82.7, 82.8, 82.9, 83.0, 82.3, 82.6, 83.0, 83.2, 83.4] } },
  { code: 'TZA', name: 'Tanzania', region: 'Africa', pop: 65, gdp: 3600, life: 66.8, unemp: 3.1, lit: 78, co2: 0.2, net: 32, fert: 4.7,
    trends: { pop: [52, 54, 55, 57, 58, 60, 61, 63, 64, 65], gdp: [2700, 2900, 3000, 3200, 3300, 3400, 3400, 3500, 3500, 3600], life: [64.3, 64.8, 65.3, 65.8, 66.2, 66.1, 66.3, 66.5, 66.7, 66.8] } },
  { code: 'ZAF', name: 'South Africa', region: 'Africa', pop: 60, gdp: 14400, life: 63.0, unemp: 32.9, lit: 95, co2: 7.2, net: 72, fert: 2.4,
    trends: { pop: [56, 57, 57, 58, 58, 59, 59, 59, 60, 60], gdp: [13300, 13500, 13800, 14100, 14300, 13400, 13800, 14100, 14300, 14400], life: [62.4, 62.8, 63.2, 63.6, 64.0, 62.6, 62.2, 62.6, 62.8, 63.0] } },
  { code: 'ITA', name: 'Italy', region: 'Europe', pop: 59, gdp: 53000, life: 83.5, unemp: 6.5, lit: 99, co2: 5.3, net: 91, fert: 1.2,
    trends: { pop: [61, 61, 60, 60, 60, 59, 59, 59, 59, 59], gdp: [40000, 41000, 42500, 44000, 44500, 41000, 44000, 48000, 51000, 53000], life: [83.2, 83.3, 83.4, 83.5, 83.6, 82.6, 82.9, 83.2, 83.4, 83.5] } },
  { code: 'KEN', name: 'Kenya', region: 'Africa', pop: 55, gdp: 6800, life: 63.7, unemp: 5.5, lit: 82, co2: 0.3, net: 43, fert: 3.2,
    trends: { pop: [46, 47, 48, 49, 50, 51, 52, 53, 54, 55], gdp: [4800, 5100, 5400, 5800, 6100, 6000, 6300, 6500, 6700, 6800], life: [62.2, 62.5, 62.8, 63.1, 63.4, 62.9, 63.1, 63.4, 63.6, 63.7] } },
  { code: 'MMR', name: 'Myanmar', region: 'Asia', pop: 55, gdp: 5200, life: 66.7, unemp: 4.2, lit: 89, co2: 0.5, net: 44, fert: 2.0,
    trends: { pop: [52, 52, 53, 53, 54, 54, 54, 55, 55, 55], gdp: [4900, 5200, 5500, 5800, 5900, 5400, 5100, 5000, 5100, 5200], life: [65.9, 66.1, 66.3, 66.5, 66.7, 66.2, 66.4, 66.5, 66.6, 66.7] } },
  { code: 'COL', name: 'Colombia', region: 'South America', pop: 52, gdp: 19200, life: 77.0, unemp: 10.2, lit: 95, co2: 1.8, net: 76, fert: 1.6,
    trends: { pop: [47, 48, 49, 50, 50, 51, 51, 52, 52, 52], gdp: [14300, 14700, 15200, 15700, 16200, 14900, 16300, 17600, 18500, 19200], life: [75.9, 76.2, 76.5, 76.7, 76.9, 75.8, 76.2, 76.6, 76.8, 77.0] } },
  { code: 'KOR', name: 'South Korea', region: 'Asia', pop: 52, gdp: 51000, life: 83.4, unemp: 2.8, lit: 98, co2: 11.0, net: 97, fert: 0.7,
    trends: { pop: [51, 51, 51, 51, 52, 52, 52, 52, 52, 52], gdp: [38000, 39500, 41000, 42500, 43500, 42500, 44500, 47000, 49500, 51000], life: [82.2, 82.5, 82.7, 82.9, 83.1, 83.2, 83.3, 83.3, 83.4, 83.4] } },
  { code: 'ESP', name: 'Spain', region: 'Europe', pop: 48, gdp: 49000, life: 84.0, unemp: 10.6, lit: 98, co2: 5.0, net: 94, fert: 1.2,
    trends: { pop: [46, 46, 47, 47, 47, 47, 47, 48, 48, 48], gdp: [37500, 38500, 40000, 41500, 42500, 38500, 41500, 44500, 47000, 49000], life: [83.4, 83.5, 83.6, 83.7, 83.8, 82.9, 83.2, 83.6, 83.8, 84.0] } },
  { code: 'CAN', name: 'Canada', region: 'North America', pop: 40, gdp: 63000, life: 82.0, unemp: 6.5, lit: 99, co2: 14.3, net: 93, fert: 1.3,
    trends: { pop: [36, 36, 37, 37, 38, 38, 39, 39, 40, 40], gdp: [47000, 48000, 49500, 51000, 52000, 49500, 53000, 57000, 60000, 63000], life: [81.9, 82.0, 82.0, 82.1, 82.2, 81.4, 81.6, 81.8, 81.9, 82.0] } },
  { code: 'AUS', name: 'Australia', region: 'Oceania', pop: 27, gdp: 66000, life: 83.7, unemp: 4.0, lit: 99, co2: 14.6, net: 91, fert: 1.6,
    trends: { pop: [24, 24, 25, 25, 25, 26, 26, 26, 27, 27], gdp: [49000, 50000, 51500, 53000, 54500, 52000, 55500, 60000, 63500, 66000], life: [82.9, 83.0, 83.1, 83.2, 83.3, 83.4, 83.5, 83.6, 83.6, 83.7] } },
];

// World totals for the overview, same sources, latest year.
export const WORLD = {
  pop: 8200, gdpMedian: 20100, life: 71.4, unemp: 5.0, lit: 87, co2: 4.5, net: 68, fert: 2.2,
  note: 'World population 8.2 billion (UN, 2024); median GDP per capita (PPP) across these 32 countries.',
};

export function indicatorByKey(key) {
  return INDICATORS.find((i) => i.key === key) || INDICATORS[0];
}

export function countryByCode(code) {
  return COUNTRIES.find((c) => c.code === code);
}

export function rankOf(code, key) {
  const sorted = [...COUNTRIES].sort((a, b) => b[key] - a[key]);
  return sorted.findIndex((c) => c.code === code) + 1;
}

export function formatValue(key, value) {
  const ind = indicatorByKey(key);
  if (key === 'pop') return `${value.toLocaleString('en-US')}m`;
  if (key === 'gdp') return `$${value.toLocaleString('en-US')}`;
  return value.toFixed(ind.decimals);
}

export function formatPlain(key, value) {
  const ind = indicatorByKey(key);
  if (key === 'gdp') return value.toLocaleString('en-US');
  return value.toFixed(ind.decimals);
}
