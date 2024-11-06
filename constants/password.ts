import { itemI, PasswordCardType, PasswordItemType, PasswordStatType } from "@/interfaces";
import { apps, social, wallets, bank, education, email, shopping, stream } from "@/assets";

export const PasswordCard_Data: PasswordCardType[] = [
  {
    id: "1",
    title: "Social",
    subtitle: "8 Passwords",
    icon: social,
  },
  {
    id: "2",
    title: "Apps",
    subtitle: "15 Passwords",
    icon: apps,
  },
  {
    id: "3",
    title: "Wallets",
    subtitle: "5 Passwords",
    icon: wallets,
  },
  {
    id: "4",
    title: "Banking",
    subtitle: "3 Passwords",
    icon: bank,
  },
  {
    id: "5",
    title: "Email",
    subtitle: "7 Passwords",
    icon: email,
  },
  {
    id: "6",
    title: "Shopping",
    subtitle: "12 Passwords",
    icon: shopping,
  },
  {
    id: "7",
    title: "Streaming",
    subtitle: "6 Passwords",
    icon: stream,
  },
  {
    id: "10",
    title: "Education",
    subtitle: "2 Passwords",
    icon: education,
  },
];

export const PasswordItem_Data: PasswordItemType[] = [
  {
    id: "1",
    type: "Social",
    username: "Sarah Doe",
    email: "-",
    address: "https://facebook.com",
    platform: "Facebook",
    passwordText: "Password1",
    icon: social,
    date: "2024-11-01",
  },
  {
    id: "2",
    type: "Social",
    username: "John Doe",
    email: "john@example.com",
    address: "https://instagram.com",
    platform: "Instagram",
    passwordText: "Password2",
    icon: social,
    date: "2024-11-01",
  },
  {
    id: "3",
    type: "App",
    username: "Ana Smith",
    email: "ana@example.com",
    address: "https://netflix.com",
    platform: "Netflix",
    passwordText: "Netflix@123",
    icon: apps,
    date: "2024-10-30",
  },
  {
    id: "4",
    type: "App",
    username: "John Doe",
    email: "john@example.com",
    address: "https://spotify.com",
    platform: "Spotify",
    passwordText: "SpotifyPass2024",
    icon: apps,
    date: "2024-10-30",
  },
  {
    id: "5",
    type: "Wallet",
    username: "John Doe",
    email: "john@example.com",
    address: "https://metamask.io",
    platform: "MetaMask",
    passwordText: "CryptoWallet01",
    icon: wallets,
    date: "2024-10-28",
  },
  {
    id: "6",
    type: "Wallet",
    username: "John Doe",
    email: "walletuser@example.com",
    address: "https://trustwallet.com",
    platform: "Trust Wallet",
    passwordText: "SecureWallet123",
    icon: wallets,
    date: "2024-10-28",
  },
  {
    id: "7",
    type: "Banking",
    username: "Alice Lee",
    email: "alice@example.com",
    address: "https://chase.com",
    platform: "Chase",
    passwordText: "ChaseBank@456",
    icon: bank,
    date: "2024-10-27",
  },
  {
    id: "8",
    type: "Shopping",
    username: "Lily Johnson",
    email: "lily@example.com",
    address: "https://amazon.com",
    platform: "Amazon",
    passwordText: "AmazonPrime2024",
    icon: shopping,
    date: "2024-10-26",
  },
  {
    id: "9",
    type: "Streaming",
    username: "Mark Davis",
    email: "mark@example.com",
    address: "https://hulu.com",
    platform: "Hulu",
    passwordText: "HuluPass2024",
    icon: stream,
    date: "2024-10-25",
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
