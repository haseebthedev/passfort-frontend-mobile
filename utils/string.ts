export const maskPassword = (password: string): string => {
  return "*".repeat(password.length);
};
