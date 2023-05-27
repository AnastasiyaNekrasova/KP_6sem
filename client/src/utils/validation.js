import React, { useEffect, useState } from "react";

export const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const [isImageDirty, setImageDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = (e) => {
    setDirty(true);
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageDirty(true);
    } else {
      setImageDirty(false);
    }
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    isImageDirty,
    onImageChange,
    ...valid,
  };
};

export const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLength, setMinLength] = useState(false);
  const [inputValid, setInputValid] = useState(false);
  const [imageEmpty, setImageEmpty] = useState(false);
  const [invalidInterval, setInvalidInterval] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLength":
          value.length < validations[validation]
            ? setMinLength(true)
            : setMinLength(false);
          break;
        case "isEmpty":
          value ? setEmpty(false) : setEmpty(true);
          break;
        case "invalidInterval":
          value <= 0 ? setInvalidInterval(true) : setInvalidInterval(false);
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmpty || minLength || imageEmpty || invalidInterval) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLength, imageEmpty, invalidInterval]);

  return {
    isEmpty,
    minLength,
    inputValid,
    setImageEmpty,
    invalidInterval
  };
};
