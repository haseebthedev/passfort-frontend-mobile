import { OnboardingI } from "@/interfaces";
import { manageDataImage, protectDataImage, saveCredentialsImage } from "@/assets";

export const OnboardingData: OnboardingI[] = [
  {
    title: "Protect Your Data",
    subtitle:
      "Stop using unsecure passwords for your online accounts, level up with OnePass. Get the most secure passwords.",
    image: protectDataImage,
  },
  {
    title: "Manage Your Data",
    subtitle:
      "Store and manage all of your passwords from one place. Don’t remember hundreds of passwords, just remember one.",
    image: manageDataImage,
  },
  {
    title: "Save Your Credentials",
    subtitle:
      "Don’t compromise your passwords by typing them in public, let OnePass autofill those and keep your credentials secure.",
    image: saveCredentialsImage,
  },
];
