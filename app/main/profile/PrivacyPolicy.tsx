import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { hp, wp } from "@/utils";
import { colorPalette } from "@/theme";
import { Spacing } from "@/styles";
import { usePrivacyPolicy, PrivacyPolicySection, useTheme } from "@/hooks";
import { AppHeader, AppText, GradientWrapper, PrivacyPolicyListItem } from "@/components";

const PrivacyPolicy = () => {
  const { lastUpdated, sections } = usePrivacyPolicy();
  const { theme } = useTheme();

  const renderContent = (content: string | string[]) => {
    if (Array.isArray(content)) {
      return (
        <View style={styles.listContainer}>
          {content.map((item, index) => (
            <PrivacyPolicyListItem key={index} text={item} />
          ))}
        </View>
      );
    }
    return <AppText text={content} type="regularSubHeading" style={[styles.paragraphText]} />;
  };

  return (
    <GradientWrapper>
      <AppHeader title="Privacy Policy" leftIconName="chevron-back" onLeftIconPress={() => router.back()} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.dateBadge, { backgroundColor: theme.cardBg, borderColor: theme.primaryBorder }]}>
          <Ionicons name="calendar-outline" size={hp(1.8)} color={colorPalette.primaryBg.secondaryLightGreen} />
          <AppText text={`Last updated: ${lastUpdated}`} type="small" style={styles.dateText} />
        </View>

        {sections.map((section: PrivacyPolicySection, index: number) => (
          <View key={index} style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.cardsBorder }]}>
            <View style={styles.sectionHeader}>
              <View style={styles.indexBadge}>
                <AppText text={`${index + 1}`} type="small" style={styles.indexText} />
              </View>
              <AppText text={section.title.replace(/^\d+\.\s/, "")} type="subHeading" style={styles.sectionTitle} />
            </View>

            <View style={[styles.divider, { backgroundColor: theme.primaryBorder }]} />

            {renderContent(section.content)}
          </View>
        ))}
      </ScrollView>
    </GradientWrapper>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  dateBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: Spacing.xxs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: hp(0.7),
    borderRadius: wp(5),
    borderWidth: 1,
    marginBottom: Spacing.xxs,
  },
  dateText: {
    color: colorPalette.primaryBg.secondayGrey,
  },
  card: {
    borderRadius: wp(4),
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  indexBadge: {
    width: hp(3),
    height: hp(3),
    borderRadius: hp(1.5),
    backgroundColor: colorPalette.primaryBg.borderColor2,
    alignItems: "center",
    justifyContent: "center",
  },
  indexText: {
    color: colorPalette.primaryBg.secondaryLightGreen,
    fontWeight: "700",
  },
  sectionTitle: {
    flex: 1,
  },
  divider: {
    height: 1,
    marginVertical: hp(0.2),
  },
  listContainer: {
    gap: hp(0.4),
  },
  paragraphText: {
    lineHeight: hp(2.6),
  },
});
