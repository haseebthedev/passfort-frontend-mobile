import * as Crypto from "expo-crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CREDENTIALS_KEY = "encrypted_credentials";
export const REMEMBER_ME_KEY = "remember_me";

export const encryptCredentials = async (email: string, password: string) => {
  try {
    const combined = `${email}:${password}`;
    const digest = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      combined
    );
    return digest;
  } catch (error) {
    console.error("Encryption error:", error);
    throw error;
  }
};

export const saveCredentials = async (email: string, password: string) => {
  try {
    const encrypted = await encryptCredentials(email, password);
    await AsyncStorage.setItem(CREDENTIALS_KEY, encrypted);
    await AsyncStorage.setItem(REMEMBER_ME_KEY, "true");
  } catch (error) {
    console.error("Error saving credentials:", error);
    throw error;
  }
};

export const clearCredentials = async () => {
  try {
    await AsyncStorage.removeItem(CREDENTIALS_KEY);
    await AsyncStorage.setItem(REMEMBER_ME_KEY, "false");
  } catch (error) {
    console.error("Error clearing credentials:", error);
    throw error;
  }
};

export const loadSavedCredentials = async () => {
  try {
    const savedRememberMe = await AsyncStorage.getItem(REMEMBER_ME_KEY);
    const savedCredentials = await AsyncStorage.getItem(CREDENTIALS_KEY);
    return { savedRememberMe, savedCredentials };
  } catch (error) {
    console.error("Error loading credentials:", error);
    throw error;
  }
};
