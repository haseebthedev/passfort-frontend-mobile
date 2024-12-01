import { PasswordStatType } from "@/interfaces";

export const updatePasswordType = (passwordStats: PasswordStatType[]) => {
  const charStat = passwordStats.find((stat) => stat.label === "Characters")?.number || "0";
  const numStat = passwordStats.find((stat) => stat.label === "Numbers")?.number || "0";
  const symStat = passwordStats.find((stat) => stat.label === "Symbols")?.number || "0";

  const charCount = parseInt(charStat);
  const numCount = parseInt(numStat);
  const symCount = parseInt(symStat);

  if (charCount + numCount + symCount === 24) {
    return "STRONG";
  } else if (charCount + numCount + symCount >= 16) {
    return "MODERATE";
  } else {
    return "WEAK";
  }
};

export const handleCharacterChange = (
  type: "increment" | "decrement",
  stat: "Characters" | "Numbers" | "Symbols",
  setPasswordStats: React.Dispatch<React.SetStateAction<PasswordStatType[]>>
) => {
  setPasswordStats((prevStats) =>
    prevStats.map((statItem) =>
      statItem.label === stat && (type === "increment" ? parseInt(statItem.number) < 8 : parseInt(statItem.number) > 0)
        ? {
            ...statItem,
            number: (parseInt(statItem.number) + (type === "increment" ? 1 : -1)).toString().padStart(2, "0"),
          }
        : statItem
    )
  );
};

export const handleNumberChange = (
  stat: "Characters" | "Numbers" | "Symbols",
  number: number,
  setPasswordStats: React.Dispatch<React.SetStateAction<PasswordStatType[]>>
) => {
  setPasswordStats((prevStats) =>
    prevStats.map((statItem) =>
      statItem.label === stat
        ? {
            ...statItem,
            number: number.toString().padStart(2, "0"),
          }
        : statItem
    )
  );
};

export const generateRandomPassword = (charLength: number, numLength: number, symbolsLength: number): string => {
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[{]}\\|;:,.<>?";

  const totalCharLength = charLength;
  const availableChars = lowerCaseLetters + upperCaseLetters;
  const totalNumLength = numLength;
  const availableNumbers = numbers;
  const totalSymbolsLength = symbolsLength;
  const availableSymbols = symbols;

  let password = "";

  for (let i = 0; i < totalCharLength; i++) {
    const randomIndex = Math.floor(Math.random() * availableChars.length);
    password += availableChars[randomIndex];
  }

  for (let i = 0; i < totalNumLength; i++) {
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    password += availableNumbers[randomIndex];
  }

  for (let i = 0; i < totalSymbolsLength; i++) {
    const randomIndex = Math.floor(Math.random() * availableSymbols.length);
    password += availableSymbols[randomIndex];
  }

  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return password;
};
