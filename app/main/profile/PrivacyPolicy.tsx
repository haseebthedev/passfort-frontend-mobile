import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { router } from "expo-router";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppHeader, AppText, GradientWrapper } from "@/components";
import { hp } from "@/utils";
import { useAuthStore } from "@/store";

const PrivacyPolicy = () => {
  const { user } = useAuthStore();

  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader
        title="Privacy Policy"
        leftIconName="chevron-back"
        onLeftIconPress={() => router.back()}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <AppText
          text={`Last updated: ${new Date().toLocaleDateString()}`}
          type="description"
          style={styles.lastUpdated}
        />

        <View style={styles.section}>
          <AppText text="1. Information We Collect" type="heading" />
          <AppText
            text="We collect information that you provide directly to us, including:"
            type="default"
          />
          <View style={styles.listItem}>
            <AppText text="•" style={styles.bullet} />
            <AppText
              text={`Account information (${user?.name}, ${user?.email})`}
              type="default"
            />
          </View>
          <View style={styles.listItem}>
            <AppText text="•" style={styles.bullet} />
            <AppText text="Profile information" type="default" />
          </View>
          <View style={styles.listItem}>
            <AppText text="•" style={styles.bullet} />
            <AppText text="Usage data and preferences" type="default" />
          </View>
        </View>

        <View style={styles.section}>
          <AppText text="2. How We Use Your Information" type="heading" />
          <AppText
            text="We use the information we collect to:"
            type="default"
          />
          <View style={styles.listItem}>
            <AppText text="•" style={styles.bullet} />
            <AppText text="Provide and maintain our services" type="default" />
          </View>
          <View style={styles.listItem}>
            <AppText text="•" style={styles.bullet} />
            <AppText
              text="Improve and personalize your experience"
              type="default"
            />
          </View>
          <View style={styles.listItem}>
            <AppText text="•" style={styles.bullet} />
            <AppText
              text="Communicate with you about our services"
              type="default"
            />
          </View>
          <View style={styles.listItem}>
            <AppText text="•" style={styles.bullet} />
            <AppText
              text="Ensure the security of your account"
              type="default"
            />
          </View>
        </View>

        <View style={styles.section}>
          <AppText text="3. Data Security" type="heading" />
          <AppText
            text="We implement appropriate security measures to protect your personal information. Your data is encrypted and stored securely."
            type="default"
          />
        </View>

        <View style={styles.section}>
          <AppText text="4. Your Rights" type="heading" />
          <AppText text="You have the right to:" type="default" />
          <View style={styles.listItem}>
            <AppText text="•" style={styles.bullet} />
            <AppText text="Access your personal data" type="default" />
          </View>
          <View style={styles.listItem}>
            <AppText text="•" style={styles.bullet} />
            <AppText text="Correct inaccurate data" type="default" />
          </View>
          <View style={styles.listItem}>
            <AppText text="•" style={styles.bullet} />
            <AppText text="Request deletion of your data" type="default" />
          </View>
          <View style={styles.listItem}>
            <AppText text="•" style={styles.bullet} />
            <AppText text="Object to data processing" type="default" />
          </View>
        </View>

        <View style={styles.section}>
          <AppText text="5. Contact Us" type="heading" />
          <AppText
            text="If you have any questions about this Privacy Policy, please contact us at:"
            type="default"
          />
          <View style={styles.listItem}>
            <AppText text="•" style={styles.bullet} />
            <AppText text="support@passfort.com" type="default" />
          </View>
        </View>
      </ScrollView>
    </GradientWrapper>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  lastUpdated: {
    color: colorPalette.primaryBg.secondayGrey,
    marginBottom: Spacing.sm,
  },
  section: {
    gap: hp(0.5),
    marginVertical: Spacing.md,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginLeft: Spacing.sm,
    marginVertical: hp(0.2),
  },
  bullet: {
    marginRight: Spacing.sm,
    color: colorPalette.primaryBg.primaryWhite,
  },
});
