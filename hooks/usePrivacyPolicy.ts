import { useAuthStore } from '@/store';

export interface PrivacyPolicySection {
  title: string;
  content: string | string[];
}

export const usePrivacyPolicy = () => {
  const { user } = useAuthStore();

  const getSections = (): PrivacyPolicySection[] => [
    {
      title: "1. Information We Collect",
      content: [
        `Account information (${user?.name}, ${user?.email})`,
        "Profile information",
        "Usage data and preferences"
      ]
    },
    {
      title: "2. How We Use Your Information",
      content: [
        "Provide and maintain our services",
        "Improve and personalize your experience",
        "Communicate with you about our services",
        "Ensure the security of your account"
      ]
    },
    {
      title: "3. Data Security",
      content: "We implement appropriate security measures to protect your personal information. Your data is encrypted and stored securely."
    },
    {
      title: "4. Your Rights",
      content: [
        "Access your personal data",
        "Correct inaccurate data",
        "Request deletion of your data",
        "Object to data processing"
      ]
    },
    {
      title: "5. Contact Us",
      content: "If you have any questions about this Privacy Policy, please contact us at: support@passfort.com"
    }
  ];

  return {
    lastUpdated: new Date().toLocaleDateString(),
    sections: getSections()
  };
}; 