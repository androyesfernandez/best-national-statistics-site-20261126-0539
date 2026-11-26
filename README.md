# Atlas of Nations — National Statistics Explorer

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/competitions/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/androyesfernandez/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/competitions/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/androyesfernandez/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/competitions/best-national-statistics-site-20261126-0539)

A national statistics site that runs entirely offline from its own files. Population, GDP per capita (PPP), life expectancy, unemployment, adult literacy, CO2 per capita, internet users and fertility for 32 countries — with ten-year trends (2015–2024), a sortable rankings table, side-by-side comparison of up to four countries, and a full country profile for each one. Figures are the World Bank's World Development Indicators and the United Nations' World Population Prospects, latest available year, rounded and sourced on every page.

## Explore

- **Overview** (`#/`) — world totals, a re-rankable top-10 bar chart, the biggest / longest-lived / richest tables, and regions at a glance.
- **Country profile** (`#/country/IDN`) — all eight indicators with ranks out of 32, three trend charts, and a table against the 32-country average.
- **Rankings** (`#/rankings`) — sort by any column, filter by region, search by name.
- **Compare** (`#/compare`) — tick up to four countries for a side-by-side table with best values highlighted, plus an overlaid trend chart.
- **Sources & methods** (`#/about`) — what each figure is, its year, and its limits.

## Run it

Serve `app/` with any static server (no build step, no network requests):

```sh
python3 -m http.server 8080 --directory app
```

Then open http://localhost:8080/ in a desktop browser or on a phone.

## License

See [LICENSE](LICENSE).
