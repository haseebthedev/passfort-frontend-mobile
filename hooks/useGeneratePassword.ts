import { PasswordStats_Data } from "@/constants";
import { PasswordStatType, PasswordType } from "@/interfaces";
import { generateRandomPassword, updatePasswordType } from "@/utils";
import { useCallback, useEffect, useState } from "react";

export const useGeneratePassword = () => {
     const [count, setCount] = useState<number>(0);
      const [passwordType, setPasswordType] = useState<PasswordType>("WEAK");
      const [selectedCard, setSelectedCard] = useState<PasswordStatType>(
        PasswordStats_Data[0]
      );
      const [passwordStats, setPasswordStats] =
        useState<PasswordStatType[]>(PasswordStats_Data);
      const [randomPassword, setRandomPassword] = useState<string>("");
    
      const selectedCardNumber = selectedCard
        ? passwordStats.find((stat) => stat.id === selectedCard.id)?.number
        : "00";


        const updatePasswordTypeCallback = useCallback(() => {
            const type = updatePasswordType(passwordStats);
            setPasswordType(type);
          }, [passwordStats]);
    
         
          useEffect(() => {
            updatePasswordTypeCallback();
          }, [passwordStats, updatePasswordTypeCallback]);
        
          useEffect(() => {
            setCount(Number(selectedCardNumber));
          }, [selectedCard, passwordStats]);

        const generatePassword = () => {
            const charLength = Number(passwordStats[0]?.number);
            const numLength = Number(passwordStats[1]?.number);
            const symbolsLength = Number(passwordStats[2]?.number);
        
            const password = generateRandomPassword(
              charLength,
              numLength,
              symbolsLength
            );
            setRandomPassword(password);
          };


          const handleCardPress = (item: PasswordStatType) => setSelectedCard(item);


    return {
        count,
        randomPassword,
        passwordType,
        selectedCard,
        passwordStats,
        setPasswordStats,
        generatePassword,
        handleCardPress
    }
}