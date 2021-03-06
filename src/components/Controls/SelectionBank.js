/**
  A component created using the react-select.js library
  It is implemented to provde input control on the bank name selections 
  and used on several places.

  To understand the implementation of the library,I have used the 
  documentation provided on: https://react-select.com/home 
*/

import React, { useEffect, useState } from "react";
import Select from "react-select";
import service from "../../services/service";
import { to } from "await-to-js";
import { errorToString } from "utility";
import { toast } from "react-toastify";

const SelectBank = (props) => {
  const { value, onBankChange, allBanks, disabled } = props;
  const [options, setOptions] = useState([]);

  useEffect(async () => {
    const [error, response] = await to(service.getBankList());
    if (error) {
      toast.error(errorToString(error));
      return;
    }

    const tempOptions = [];
    if (allBanks) {
      tempOptions.push({ value: null, label: "All Banks" });
    }
    response.data.forEach((bank) => {
      tempOptions.push({ value: bank._id, label: bank.name });
    });

    setOptions(tempOptions);
  }, []);

  return (
    <>
      <Select
        value={value}
        onChange={onBankChange}
        options={options}
        isDisabled={disabled}
      ></Select>
    </>
  );
};

export default SelectBank;
