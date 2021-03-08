import react, { useState, useEffect } from "react";
import Select from "react-select";

const SelectionYear = ({ value, onYearChange }) => {
  //const { value, onCategoryChange } = props;
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
