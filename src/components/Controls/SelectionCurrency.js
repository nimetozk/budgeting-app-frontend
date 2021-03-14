import react, { useState } from "react";
import Select from "react-select";

const SelectionCurrency = ({ value, onCurrencyChange }) => {
  const [options, setOptions] = useState([
    { value: "GBP", label: "GBP" },
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
  ]);

  return (
    <Select
      value={value}
      onChange={onCurrencyChange}
      options={options}
    ></Select>
  );
};

export default SelectionCurrency;
