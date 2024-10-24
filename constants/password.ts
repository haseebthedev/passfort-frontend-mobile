import { PasswordCardType, PasswordItemType } from "@/interfaces";
import apps from "../assets/Icons/apps.png";
import social from "../assets/Icons/social.png";
import wallet from "../assets/Icons/wallets.png";

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
    icon: wallet,
  },
];

export const PasswordItem_Data: PasswordItemType[] = [
  {
    id: "1",
    title: "Twitter",
    passwordText: "Password1",
    icon: social,
  },
  {
    id: "2",
    title: "Instagram",
    passwordText: "Password2",
    icon: social,
  },
  {
    id: "3",
    title: "Figma",
    passwordText: "Password3",
    icon: apps,
  },
  {
    id: "4",
    title: "Facebook",
    passwordText: "Password4",
    icon: social,
  },
];
