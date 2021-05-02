/**
  A component created using the react-select.js library
  It is implemented to provde input control on the year selections.

  To understand the implementation of the library,I have used the 
  documentation provided on: https://react-select.com/home 
*/

import react, { useState, useEffect } from "react";
import Select from "react-select";

const SelectionYear = ({ value, onYearChange }) => {
  const [options, setOptions] = useState([]);

  useEffect(async () => {
    const tempOptions = [];
    for (let index = 2015; index < 2030; index++) {
      tempOptions.push({ value: index, label: index.toString() });
    }

    setOptions(tempOptions);
  }, []);

  return (
    <Select value={value} onChange={onYearChange} options={options}></Select>
  );
};

export default SelectionYear;
