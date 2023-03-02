type ValidationRule = (item: any) => boolean | string;

export const required: ValidationRule = (item) => {
  if (item !== null || item !== undefined) {
    return true;
  }

  return "This value is required";
};
