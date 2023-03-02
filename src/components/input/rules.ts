type ValidationRule = (item: any) => boolean | string;

export const required: ValidationRule = (item) => {
  if (item) {
    return true;
  }

  return "This value is required";
};
