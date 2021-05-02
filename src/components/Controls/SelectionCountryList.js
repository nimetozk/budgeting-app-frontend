/**
  A component created using the react-select.js library
  It is implemented to provde input control on country selections.

  To understand the implementation of the library,I have used the 
  documentation provided on: https://react-select.com/home 
*/

import react, { useEffect, useState } from "react";
import Select from "react-select";
import { countryList } from "../../utility";

const SelectionCountry = ({ value, onCountryChange }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const tempOptions = [];
    countryList.forEach((country) => {
      tempOptions.push({ value: country.code, label: country.name });
    });

    setOptions(tempOptions);
  }, []);

  return (
    <Select value={value} onChange={onCountryChange} options={options}></Select>
  );
};

export default SelectionCountry;
