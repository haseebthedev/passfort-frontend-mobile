import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';

export const CREDENTIALS_KEY = "encrypted_credentials";
export const REMEMBER_ME_KEY = "remember_me";

export const encryptCredentials = async (email: string, password: string) => {
  try {
    await SecureStore.setItemAsync(CREDENTIALS_KEY, JSON.stringify({ email, password }));
    return true;
  } catch (error) {
    console.error("Encryption error:", error);
    throw error;
  }
};

export const decryptCredentials = async () => {
  try {
    const credentials = await SecureStore.getItemAsync(CREDENTIALS_KEY);
    if (credentials) {
      const { email, password } = JSON.parse(credentials);
      return { email, password };
    }
    return null;
  } catch (error) {
    console.error("Decryption error:", error);
    throw error;
  }
};

export const saveCredentials = async (email: string, password: string) => {
  try {
    await encryptCredentials(email, password);
    await AsyncStorage.setItem(REMEMBER_ME_KEY, "true");
  } catch (error) {
    console.error("Error saving credentials:", error);
    throw error;
  }
};

export const clearCredentials = async () => {
  try {
    await SecureStore.deleteItemAsync(CREDENTIALS_KEY);
    await AsyncStorage.removeItem(REMEMBER_ME_KEY);
  } catch (error) {
    console.error("Error clearing credentials:", error);
    throw error;
  }
};

export const loadSavedCredentials = async () => {
  try {
    const savedRememberMe = await AsyncStorage.getItem(REMEMBER_ME_KEY);
    const savedCredentials = await SecureStore.getItemAsync(CREDENTIALS_KEY);
    return { savedRememberMe, savedCredentials };
  } catch (error) {
    console.error("Error loading credentials:", error);
    throw error;
  }
};
