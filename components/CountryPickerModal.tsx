import React, { useState } from "react";
import CountryPicker, {
  Country,
  CountryCode,
  TranslationLanguageCodeMap,
  DARK_THEME,
  DEFAULT_THEME,
} from "react-native-country-picker-modal";
import { useTheme } from "@/hooks";
import { LogBox } from "react-native";

interface CountryPickerModalI {
  visible: boolean;
  setSelectedCountry: (name: string | TranslationLanguageCodeMap) => void;
  setCountryModalVisible: (value: boolean) => void;
}

LogBox.ignoreLogs(["CountryItem: Support for defaultProps will be removed"]);

const CountryPickerModal: React.FC<CountryPickerModalI> = ({ visible, setSelectedCountry, setCountryModalVisible }) => {
  const { theme, mode } = useTheme();

  const [countryCode, setCountryCode] = useState<CountryCode>("FR");
  const [country, setCountry] = useState<Country | null>(null);

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);
    setSelectedCountry(country.name);
    setCountryModalVisible(false);
  };
  return (
    <>
      {visible && (
        <CountryPicker
          countryCode={countryCode}
          withFilter={true}
          withFlag={true}
          withCountryNameButton={false}
          withAlphaFilter={false}
          withCallingCode={false}
          onSelect={onSelect}
          visible={visible}
          withEmoji={false}
          onClose={() => setCountryModalVisible(false)}
          theme={mode === "dark" ? DARK_THEME : DEFAULT_THEME}
        />
      )}
    </>
  );
};

export { CountryPickerModal };
