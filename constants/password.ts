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
    username: "Sarah doe",
    email: "-",
    address: "http://",
    platform: "Facebook",
    passwordText: "Password1",
    icon: social,
    date: "2024-11-01",
  },
  {
    id: "2",
    type: "Social",
    username: "john doe",
    email: "john@example.com",
    address: "http://",
    platform: "Instagram",
    passwordText: "Password2",
    icon: social,
    date: "2024-11-01",
  },
  {
    id: "3",
    type: "App",
    username: "Ana Smith",
    email: "jane@example.com",
    address: "http://",
    platform: "Netflix",
    passwordText: "Netflix@123",
    icon: social,
    date: "2024-10-30",
  },
  {
    id: "4",
    type: "App",
    username: "john doe",
    email: "jane@example.com",
    address: "http://",
    platform: "Spotify",
    passwordText: "SpotifyPass2024",
    icon: social,
    date: "2024-10-30",
  },
  {
    id: "5",
    type: "Wallet",
    username: "john doe",
    email: "jane@example.com",
    address: "http://",
    platform: "MetaMask",
    passwordText: "CryptoWallet01",
    icon: social,
    date: "2024-10-28",
  },
  {
    id: "6",
    type: "Wallet",
    username: "john doe",
    email: "walletuser@example.com",
    address: "http://",
    platform: "Trust Wallet",
    passwordText: "SecureWallet123",
    icon: social,
    date: "2024-10-28",
  },
  {
    id: "7",
    type: "Social",
    username: "john doe",
    email: "admin@example.com",
    address: "http://",
    platform: "LinkedIn",
    passwordText: "LinkedInPass!",
    icon: social,
    date: "2024-10-27",
  },
];

export const Password_Type: itemI[] = [
  { label: "Wallets", value: "Wallets" },
  { label: "Social", value: "Social" },
  { label: "Apps", value: "Apps" },
];

export const PasswordStats_Data: PasswordStatType[] = [
  { id: "1", label: "Characters", number: "10" },
  { id: "2", label: "Numbers", number: "04" },
  { id: "3", label: "Symbols", number: "08" },
];
