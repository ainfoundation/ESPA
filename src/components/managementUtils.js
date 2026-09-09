import airportData from '@nwpr/airport-codes/dist/airports.json';

// Pre-process the data to group by country and then get unique cities
const getCitiesByCountry = () => {
  const map = {};
  for (const a of airportData) {
    if (a.iata && a.iata !== '\\N' && a.city && a.country) {
      if (!map[a.country]) {
        map[a.country] = new Map();
      }
      // If there are multiple airports in a city, we just keep the first or a generic one, 
      // but actually a city can have multiple airports. The user asked to "automatically figure the AIRPORT CODE when the city is selected".
      // So we map city -> IATA. If a city has multiple, we'll just pick the first one we see.
      if (!map[a.country].has(a.city)) {
        map[a.country].set(a.city, a.iata);
      }
    }
  }
  
  const result = {};
  for (const country in map) {
    result[country] = Array.from(map[country].entries()).map(([city, iata]) => ({ city, iata })).sort((a, b) => a.city.localeCompare(b.city));
  }
  return result;
};

export const citiesByCountry = getCitiesByCountry();

export const getCities = (country) => {
  if (!country || !citiesByCountry[country]) return [];
  return citiesByCountry[country];
};

export const getAirportCode = (country, city) => {
  const cities = getCities(country);
  const found = cities.find(c => c.city === city);
  return found ? found.iata : '';
};
