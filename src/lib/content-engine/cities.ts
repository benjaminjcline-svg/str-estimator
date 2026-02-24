/**
 * Top 200 North American cities for STR news relevance.
 * Used by the daily brief to highlight city-specific coverage.
 * Source: population + major STR markets (US, Canada, Mexico focus).
 */
export const TOP_NA_CITIES: string[] = [
  "Mexico City", "New York City", "Los Angeles", "Toronto", "Chicago",
  "Houston", "Havana", "Montreal", "Tijuana", "Phoenix", "Philadelphia",
  "San Antonio", "San Diego", "Dallas", "Guatemala City", "Edmonton",
  "Ottawa", "Monterrey", "Austin", "Jacksonville", "San Jose", "Fort Worth",
  "Columbus", "Charlotte", "Cancún", "Indianapolis", "Winnipeg", "San Francisco",
  "Vancouver", "Seattle", "Denver", "Nashville", "El Paso", "Washington",
  "Las Vegas", "Boston", "Portland", "Hamilton", "Louisville", "Memphis",
  "Detroit", "Quebec City", "Baltimore", "Milwaukee", "Albuquerque", "Tucson",
  "Fresno", "Sacramento", "Mesa", "Kansas City", "Atlanta", "Miami",
  "Colorado Springs", "Raleigh", "Omaha", "Long Beach", "Virginia Beach",
  "Oakland", "Minneapolis", "Tulsa", "Tampa", "Arlington", "New Orleans",
  "Wichita", "Cleveland", "Bakersfield", "Aurora", "Honolulu", "Anaheim",
  "Santa Ana", "St. Louis", "Riverside", "Corpus Christi", "Lexington",
  "Pittsburgh", "Anchorage", "Stockton", "Cincinnati", "St. Paul",
  "St. Petersburg", "Toledo", "Newark", "Greensboro", "Plano", "Henderson",
  "Lincoln", "Buffalo", "Jersey City", "Chula Vista", "Fort Wayne",
  "Orlando", "St. Petersburg", "Chandler", "Laredo", "Norfolk", "Durham",
  "Madison", "Winston-Salem", "Lubbock", "Garland", "Glendale", "Hialeah",
  "Reno", "Baton Rouge", "Irvine", "Chesapeake", "Irving", "North Las Vegas",
  "Scottsdale", "Birmingham", "Rochester", "Richmond", "Boise", "San Bernardino",
  "Spokane", "Birmingham", "Modesto", "Des Moines", "Fayetteville",
  "Oxnard", "Fontana", "Columbus", "Montgomery", "Moreno Valley",
  "Santa Clarita", "Aurora", "Yonkers", "Akron", "Huntington Beach",
  "Glendale", "Little Rock", "Amarillo", "Columbus", "Salt Lake City",
  "Worcester", "Newport News", "Huntsville", "Knoxville", "Grand Prairie",
  "Grand Rapids", "Tallahassee", "Oceanside", "Overland Park", "Santa Rosa",
  "Garden Grove", "Chattanooga", "Fort Lauderdale", "Rancho Cucamonga",
  "Santa Maria", "Port St. Lucie", "Temecula", "Ontario", "Vancouver",
  "Springfield", "Cape Coral", "Pembroke Pines", "Sioux Falls", "Peoria",
  "Lancaster", "Elk Grove", "Palmdale", "Salinas", "Springfield",
  "Pomona", "Pasadena", "Joliet", "Paterson", "Kansas City", "Torrance",
  "Rockford", "Jersey City", "Bridgeport", "Savannah", "Escondido",
  "Mesquite", "Sunnyvale", "Hollywood", "Pasadena", "Orange", "Naperville",
  "Dayton", "Hampton", "Warren", "Miramar", "West Valley City",
  "Olathe", "Columbia", "Sterling Heights", "New Haven", "Waco",
  "Charleston", "Thousand Oaks", "Cedar Rapids", "Visalia", "Topeka",
  "Elizabeth", "Gainesville", "Thornton", "Roseville", "Carrollton",
  "Coral Springs", "Stamford", "Simi Valley", "Concord", "Hartford",
  "Kent", "Lafayette", "Midland", "Surprise", "Denton", "Victoria",
  "Evansville", "Rochester", "Kansas City", "Atlanta", "Laredo",
  "Kingston", "Windsor", "Saskatoon", "Regina", "Kelowna", "St. John's",
  "Halifax", "Oaxaca", "Playa del Carmen", "Cabo San Lucas", "Puerto Vallarta",
  "San Miguel de Allende", "Palm Springs", "Asheville", "Branson",
  "Park City", "Telluride", "Aspen", "Miami Beach", "Key West",
];

export function getCitiesContextForPrompt(): string {
  return `You're analyzing STR news for North American markets. We track these major cities (US, Canada, Mexico, Caribbean): ${TOP_NA_CITIES.slice(0, 80).join(", ")}... (and 120 more). When a headline mentions a city, call it out. Focus on regulatory changes, market shifts, and deal implications.`;
}
