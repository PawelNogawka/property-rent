"use client";

import Select from "react-select";

import useCountries from "@/app/hooks/useCountries";

import "./CountrySelect.scss";

export type CountrySelectValue = {
  value: string;
  latlng: number[];
  region: string;
  label: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();
  return (
    <Select
      options={getAll()}
      placeholder="Choose a country..."
      isClearable
      value={value}
      className="custom-select"
      onChange={(value) => onChange(value as CountrySelectValue)}
      formatOptionLabel={(option: any) => (
        <div className="select-option">
          <div className="select-option__flag">{option.flag}</div>
          <span className="select-option__line">|</span>
          <span className="select-option__label">{option.label}</span>,
          <span className="select-option__region">{option.region}</span>
        </div>
      )}
    />
  );
};

export default CountrySelect;
