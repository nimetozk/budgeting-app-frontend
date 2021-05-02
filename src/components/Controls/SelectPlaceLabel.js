/**
  A component created using the react-select.js library
  It is implemented to provde input control on the user place label selections.

  To understand the implementation of the library,I have used the 
  documentation provided on: https://react-select.com/home 
*/

import React, { useEffect, useState } from "react";
import Select from "react-select";
import service from "../../services/service";
import { to } from "await-to-js";
import { errorToString } from "utility";
import { toast } from "react-toastify";

const SelectPlaceLabel = (props) => {
  const { externalDatasource, value, onPlaceLabelChange } = props;
  const [options, setOptions] = useState([]);

  useEffect(async () => {
    const [error, response] = await to(service.getPlaceLabels());
    if (error) {
      toast.error(errorToString(error));
      return;
    }

    const tempOptions = [];

    response.data.forEach((placeLabel) => {
      tempOptions.push({
        value: placeLabel._id,
        label: placeLabel.name,
        placeLabel: placeLabel,
      });
    });

    setOptions(tempOptions);
  }, []);

  useEffect(() => {
    if (externalDatasource && externalDatasource.length) {
      const tempOptions = [];

      externalDatasource.forEach((placeLabel) => {
        tempOptions.push({
          value: placeLabel._id,
          label: placeLabel.name,
          placeLabel: placeLabel,
        });
      });

      setOptions(tempOptions);
    }
  }, [externalDatasource]);

  return (
    <>
      <Select
        value={value}
        onChange={onPlaceLabelChange}
        options={options}
      ></Select>
    </>
  );
};

export default SelectPlaceLabel;
