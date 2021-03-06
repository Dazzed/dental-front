/*
Common Constants
================================================================================
Organized (mostly) alphabetically by section title and then constant name.

NOTE: The "Location" constants (US_STATES) and "Time & Date" constants
      (DAYS, MONTHS, and YEARS) are at the end of this document because they are
      very long and would otherwise push more commonly referenced constants to
      the bottom.
*/

/*
DentalHQ Info
------------------------------------------------------------
*/
export const contactSupportEmail = 'questions@dentalhq.com';

/*
Financial
------------------------------------------------------------
*/
export const Currencies = {
  USD: 'USD',
  CAD: 'CAD',
};

/*
Member Info
------------------------------------------------------------
*/
export const MEMBER_ORIGINS = {
  external: 'External',
  internal: 'Internal',
};

export const MEMBER_RELATIONSHIP_TYPES = {
  partner: 'Spouse',
  son: 'Son',
  daughter: 'Daughter'
};

export const PREFERRED_CONTACT_METHODS = {
  office: 'I will contact the office',
  email: 'Email',
  phone: 'Phone',
};

export const PREFERRED_CONTACT_METHODS_DENTIST_POV = {
  office: 'They will contact you',
  email: 'Email',
  phone: 'Phone',
};

export const SEX_TYPES = {
  M: 'Male',
  F: 'Female',
};

/*
User Types
------------------------------------------------------------
*/
export const USER_TYPES = {
  ADMIN: 'admin',
  CLIENT: 'client',
  DENTIST: 'dentist',
};

/*
Location
------------------------------------------------------------
*/
export const US_STATES = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
};

/*
Time & Date
------------------------------------------------------------
*/
export const DAYS = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: 10,
  11: 11,
  12: 12,
  13: '13',
  14: '14',
  15: '15',
  16: '16',
  17: '17',
  18: '18',
  19: '19',
  20: '20',
  21: '21',
  22: '22',
  23: '23',
  24: '24',
  25: '25',
  26: '26',
  27: '27',
  28: '28',
  29: '29',
  30: '30',
  31: '31',
};

export const MONTHS = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

export const MONTH_NUMBERS = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

export const YEARS = {
  1900: '1900',
  1901: '1901',
  1902: '1902',
  1903: '1903',
  1904: '1904',
  1905: '1905',
  1906: '1906',
  1907: '1907',
  1908: '1908',
  1909: '1909',
  1910: '1910',
  1911: '1911',
  1912: '1912',
  1913: '1913',
  1914: '1914',
  1915: '1915',
  1916: '1916',
  1917: '1917',
  1918: '1918',
  1919: '1919',
  1920: '1920',
  1921: '1921',
  1922: '1922',
  1923: '1923',
  1924: '1924',
  1925: '1925',
  1926: '1926',
  1927: '1927',
  1928: '1928',
  1929: '1929',
  1930: '1930',
  1931: '1931',
  1932: '1932',
  1933: '1933',
  1934: '1934',
  1935: '1935',
  1936: '1936',
  1937: '1937',
  1938: '1938',
  1939: '1939',
  1940: '1940',
  1941: '1941',
  1942: '1942',
  1943: '1943',
  1944: '1944',
  1945: '1945',
  1946: '1946',
  1947: '1947',
  1948: '1948',
  1949: '1949',
  1950: '1950',
  1951: '1951',
  1952: '1952',
  1953: '1953',
  1954: '1954',
  1955: '1955',
  1956: '1956',
  1957: '1957',
  1958: '1958',
  1959: '1959',
  1960: '1960',
  1961: '1961',
  1962: '1962',
  1963: '1963',
  1964: '1964',
  1965: '1965',
  1966: '1966',
  1967: '1967',
  1968: '1968',
  1969: '1969',
  1970: '1970',
  1971: '1971',
  1972: '1972',
  1973: '1973',
  1974: '1974',
  1975: '1975',
  1976: '1976',
  1977: '1977',
  1978: '1978',
  1979: '1979',
  1980: '1980',
  1981: '1981',
  1982: '1982',
  1983: '1983',
  1984: '1984',
  1985: '1985',
  1986: '1986',
  1987: '1987',
  1988: '1988',
  1989: '1989',
  1990: '1990',
  1991: '1991',
  1992: '1992',
  1993: '1993',
  1994: '1994',
  1995: '1995',
  1996: '1996',
  1997: '1997',
  1998: '1998',
  1999: '1999',
  2000: '2000',
  2001: '2001',
  2002: '2002',
  2003: '2003',
  2004: '2004',
  2005: '2005',
  2006: '2006',
  2007: '2007',
  2008: '2008',
  2009: '2009',
  2010: '2010',
  2011: '2011',
  2012: '2012',
  2013: '2013',
  2014: '2014',
  2015: '2015',
  2016: '2016',
  2017: '2017'
};
