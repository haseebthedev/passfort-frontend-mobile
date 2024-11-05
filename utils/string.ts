export const maskPassword = (password: string): string => {
  return "*".repeat(password.length);
};

export const capitalize = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const getInitials = (username: string) => {
  if (!username) return "";
  const words = username.split(" ");
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};
