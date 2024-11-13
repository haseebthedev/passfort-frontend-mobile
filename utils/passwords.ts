import { PasswordStatType } from "@/interfaces";

export const updatePasswordType = (passwordStats: PasswordStatType[]) => {
  const charStat = passwordStats.find((stat) => stat.label === "Characters")?.number || "0";
  const numStat = passwordStats.find((stat) => stat.label === "Numbers")?.number || "0";
  const symStat = passwordStats.find((stat) => stat.label === "Symbols")?.number || "0";

  const charCount = parseInt(charStat);
  const numCount = parseInt(numStat);
  const symCount = parseInt(symStat);

  if (charCount >= 8 && numCount >= 8 && symCount >= 8) {
    return "STRONG";
  } else if (charCount < 5 && numCount < 5 && symCount < 5) {
    return "WEAK";
  } else {
    return "MODERATE";
  }
};

export const handleIncrement = (
  selectedCard: string | null,
  passwordStats: PasswordStatType[],
  setPasswordStats: React.Dispatch<React.SetStateAction<PasswordStatType[]>>
) => {
  setPasswordStats((prevStats) =>
    prevStats.map((stat) =>
      stat.id === selectedCard && parseInt(stat.number) < 8
        ? { ...stat, number: (parseInt(stat.number) + 1).toString().padStart(2, "0") }
        : stat
    )
  );
};

export const handleDecrement = (
  selectedCard: string | null,
  passwordStats: PasswordStatType[],
  setPasswordStats: React.Dispatch<React.SetStateAction<PasswordStatType[]>>
) => {
  setPasswordStats((prevStats) =>
    prevStats.map((stat) =>
      stat.id === selectedCard && parseInt(stat.number) > 0
        ? { ...stat, number: (parseInt(stat.number) - 1).toString().padStart(2, "0") }
        : stat
    )
  );
};
