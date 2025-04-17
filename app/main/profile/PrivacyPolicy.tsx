import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { router } from "expo-router";
import { LayoutStyles } from "@/styles";
import { AppHeader, AppText, GradientWrapper } from "@/components";

const PrivacyPolicy = () => {
  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader 
        title="Privacy Policy" 
        leftIconName="chevron-back" 
        onLeftIconPress={() => router.back()} 
      />
      
      <ScrollView style={styles.content}>
        <AppText text={`Last updated: ${new Date().toLocaleDateString()}`}/>
        <AppText text="1. Information We Collect"/>    

        <AppText text="
        We collect information that you provide directly to us, including:
          - Account information (email, password)
          - Profile information
          - Usage data and preferences
        "/>    
          

          <AppText text="2. How We Use Your Information"/>    

        <AppText 
        text="
          We use the information we collect to:
          - Provide and maintain our services
          - Improve and personalize your experience
          - Communicate with you about our services
          - Ensure the security of your account
          "
        />
        <AppText text="3. Data Security"/>    

        
        <AppText text="
          We implement appropriate security measures to protect your personal information. 
          Your data is encrypted and stored securely.
          "
        />
        <AppText text="4. Your Rights"/>    

        
        <AppText text="
          You have the right to:
          - Access your personal data
          - Correct inaccurate data
          - Request deletion of your data
          - Object to data processing
          "
        />
        <AppText text="5. Contact Us"/>    

        
        <AppText text="
          If you have any questions about this Privacy Policy, please contact us at:
          support@passfort.com
          "
        />
      </ScrollView>
    </GradientWrapper>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },

}); 