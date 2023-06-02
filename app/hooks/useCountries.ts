import countries from "world-countries";

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  latlng: country.latlng,
  region: country.region,
  flag:country.flag
}));

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getCountryByValue = (value: string) => {
    return formattedCountries.filter((country) => country.value === value);
  };

  return { getAll, getCountryByValue };
};

export default useCountries;
