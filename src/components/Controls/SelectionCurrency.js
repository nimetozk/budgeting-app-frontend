/**
  A component created using the react-select.js library
  It is implemented to provde input control on the currency selection.

  To understand the implementation of the library,I have used the 
  documentation provided on: https://react-select.com/home 
*/

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
