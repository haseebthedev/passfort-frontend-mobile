export const maskPassword = (password: string): string => {
  return "*".repeat(password.length);
};

export const capitalize = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
