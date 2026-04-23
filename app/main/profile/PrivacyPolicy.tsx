import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { router } from "expo-router";
import { hp } from "@/utils";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { usePrivacyPolicy, PrivacyPolicySection } from "@/hooks";
import {
  AppHeader,
  AppText,
  GradientWrapper,
  PrivacyPolicyListItem,
} from "@/components";

const PrivacyPolicy = () => {
  const { lastUpdated, sections } = usePrivacyPolicy();

  const renderContent = (content: string | string[]) => {
    if (Array.isArray(content)) {
      return content.map((item, index) => (
        <PrivacyPolicyListItem key={index} text={item} />
      ));
    }
    return <AppText text={content} type="default" />;
  };

  return (
    <GradientWrapper>
      <AppHeader
        title="Privacy Policy"
        leftIconName="chevron-back"
        onLeftIconPress={() => router.back()}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <AppText
          text={`Last updated: ${lastUpdated}`}
          type="description"
          style={styles.lastUpdated}
        />

        {sections.map((section: PrivacyPolicySection, index: number) => (
          <View key={index} style={styles.section}>
            <AppText text={section.title} type="heading" />
            {renderContent(section.content)}
          </View>
        ))}
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
});
