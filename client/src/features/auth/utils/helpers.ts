export const GetFieldError = (
  errors: Record<string, string[]> | undefined,
  field: string,
) => {
  if (errors == undefined) return "";

  if (errors[field] == undefined) return "";

  return errors[field][0];
};

export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
