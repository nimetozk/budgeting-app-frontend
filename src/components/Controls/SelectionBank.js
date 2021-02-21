import React, { useEffect, useState } from "react";
import Select from "react-select";
import service from "../../services/service";
import { to } from "await-to-js";

const SelectBank = (props) => {
  const { value, onBankChange } = props;
  const [options, setOptions] = useState([]);

  useEffect(async () => {
    const [error, response] = await to(service.getBankList());
    if (error) {
      alert(error);
      return;
    }

    const tempOptions = [];
    response.data.forEach((bank) => {
      tempOptions.push({ value: bank._id, label: bank.name });
    });

    setOptions(tempOptions);
  }, []);

  return (
    <>
      <Select value={value} onChange={onBankChange} options={options}></Select>
    </>
  );
};

export default SelectBank;
