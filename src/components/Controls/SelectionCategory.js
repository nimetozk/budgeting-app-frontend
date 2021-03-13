import react, { useState, useEffect } from "react";
import service from "../../services/service";
import Select from "react-select";
import { to } from "await-to-js";
import { errorToString } from "utility";
import { toast } from "react-toastify";

const SelectionCategory = (props) => {
  const { value, onCategoryChange } = props;
  const [options, setOptions] = useState([]);

  useEffect(async () => {
    const [error, response] = await to(service.getCategoryList());
    if (error) {
      toast.error(errorToString(error));
      return;
    }

    const tempOptions = [];
    response.data.forEach((category) => {
      tempOptions.push({ value: category._id, label: category.name });
    });

    setOptions(tempOptions);
  }, []);

  return (
    <Select
      value={value}
      onChange={onCategoryChange}
      options={options}
    ></Select>
  );
};

export default SelectionCategory;
