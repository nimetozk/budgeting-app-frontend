import react, { useState, useEffect } from "react";
import service from "../../services/service";
import Select from "react-select";
import { to } from "await-to-js";
import { errorToString } from "utility";
import { toast } from "react-toastify";

const SelectionBankAccount = (props) => {
  const { value, onBankAccountChange, bankId, disabled } = props;
  const [options, setOptions] = useState([]);

  useEffect(async () => {
    if (!bankId) return;

    const [error, response] = await to(
      service.getCurrentUserBankAccountsByBank(bankId)
    );
    if (error) {
      toast.error(errorToString(error));
      return;
    }

    const tempOptions = [];
    response.data.forEach((bankAccount) => {
      tempOptions.push({
        value: bankAccount._id,
        label: `${bankAccount.sortCode} ${bankAccount.accountNo}`,
      });
    });

    setOptions(tempOptions);
  }, [bankId]);

  return (
    <>
      <Select
        value={value}
        onChange={onBankAccountChange}
        options={options}
        isDisabled={disabled}
      ></Select>
    </>
  );
};

export default SelectionBankAccount;
