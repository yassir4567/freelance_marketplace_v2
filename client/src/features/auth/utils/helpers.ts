export const GetFieldError = (
  errors: Record<string, string[]> | undefined,
  field: string,
) => {
  if (errors == undefined) return "";

  if (errors[field] == undefined) return "";

  return errors[field][0];
};
