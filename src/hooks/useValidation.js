import { useState, useEffect } from "react";

const useValidation = (value, validators) => {

  const [isEmpty, setIsEmpty] = useState(true);
  const [isNumberError, setIsNumberError] = useState(false);
  const [isNumberPositiveError, setIsNumberPositiveError] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  const numberRegex = /[0-9]/;

  useEffect(() => {
    for (const validator in validators) {
      switch (validator) {
        case 'isEmpty':
          value ? setIsEmpty(false) : setIsEmpty(true);
          break;

        case 'isNumber':
          // eslint-disable-next-line
          const isNumber = numberRegex.test(value) ? setIsNumberError(false) : setIsNumberError(true);
          break;  

        case 'isPositive':
          value > 0 ? setIsNumberPositiveError(false) : setIsNumberPositiveError(true);
          break; 

        default: 
          break;
      }
    }
    // eslint-disable-next-line
  }, [value]);

  useEffect(() => {
    if (isEmpty || isNumberError || isNumberPositiveError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }

  }, [isEmpty, isNumberError, isNumberPositiveError]);

  return {
    isEmpty,
    isNumberError,
    isNumberPositiveError,
    inputValid,
  }
}

export default useValidation;