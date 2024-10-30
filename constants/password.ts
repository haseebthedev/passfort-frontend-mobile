import { itemI, PasswordCardType, PasswordItemType, PasswordStatType } from "@/interfaces";
import { apps, social, wallets } from "@/assets";

export const PasswordCard_Data: PasswordCardType[] = [
  {
    id: "1",
    title: "Social",
    subtitle: "10 Passwords",
    icon: social,
  },
  {
    id: "2",
    title: "Apps",
    subtitle: "10 Passwords",
    icon: apps,
  },
  {
    id: "3",
    title: "Wallets",
    subtitle: "10 Passwords",
    icon: wallets,
  },
  {
    id: "4",
    title: "Social",
    subtitle: "10 Passwords",
    icon: social,
  },
  {
    id: "5",
    title: "Apps",
    subtitle: "10 Passwords",
    icon: apps,
  },
  {
    id: "6",
    title: "Wallets",
    subtitle: "10 Passwords",
    icon: wallets,
  },
];

export const PasswordItem_Data: PasswordItemType[] = [
  {
    id: "1",
    type: "Social",
    username: "john_doe",
    email: "-",
    address: "http://",
    platform: "Facebook",
    passwordText: "Password1",
    icon: social,
  },
  {
    id: "2",
    type: "Social",
    username: "john_doe",
    email: "john@example.com",
    address: "http://",
    platform: "Instagram",
    passwordText: "Password2",
    icon: social,
  },
  {
    id: "3",
    type: "App",
    username: "john_doe",
    email: "jane@example.com",
    address: "http://",
    platform: "Netflix",
    passwordText: "Netflix@123",
    icon: social,
  },
  {
    id: "4",
    type: "App",
    username: "john_doe",
    email: "jane@example.com",
    address: "http://",
    platform: "Spotify",
    passwordText: "SpotifyPass2024",
    icon: social,
  },
  {
    id: "5",
    type: "Wallet",
    username: "john_doe",
    email: "jane@example.com",
    address: "http://",
    platform: "MetaMask",
    passwordText: "CryptoWallet01",
    icon: social,
  },
  {
    id: "6",
    type: "Wallet",
    username: "john_doe",
    email: "walletuser@example.com",
    address: "http://",
    platform: "Trust Wallet",
    passwordText: "SecureWallet123",
    icon: social,
  },
  {
    id: "7",
    type: "Social",
    username: "john_doe",
    email: "admin@example.com",
    address: "http://",
    platform: "LinkedIn",
    passwordText: "LinkedInPass!",
    icon: social,
  },
];

export const Password_Type: itemI[] = [
  { label: "Type 1", value: "Type 1" },
  { label: "Type 2", value: "Type 2" },
  { label: "Type 3", value: "Type 3" },
  { label: "Type 4", value: "Type 4" },
];

export const PasswordStats_Data: PasswordStatType[] = [
  { id: "1", label: "Type 1", number: 10 },
  { id: "2", label: "Type 2", number: 4 },
  { id: "3", label: "Type 3", number: 8 },
];
