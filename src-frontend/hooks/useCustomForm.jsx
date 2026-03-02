import { useState } from "react";

export const useCustomForm = (
  initialState = {},
  onSubmit = () => null,
  validations
) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleOnChange = (name, event) => {
    if (event?.target?.type === "checkbox") {
      setFormData((prev) => {
        return {
          ...prev,
          [name]: event.target.checked,
        };
      });
      return;
    }

    setFormData((prev) => {
      return {
        ...prev,
        [name]: event ? event : "",
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validations) {
      let valid = true;
      const newErrors = {};
      for (const key in validations) {
        const value = formData[key];
        const validation = validations[key];
        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }

        const pattern = validation?.pattern;
        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          newErrors[key] = custom.message;
        }
      }

      if (!valid) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({});
    onSubmit(formData);
  };

  const reset = () => {
    setFormData(initialState);
  };

  return { formData, errors, reset, handleOnChange, handleSubmit };
};
