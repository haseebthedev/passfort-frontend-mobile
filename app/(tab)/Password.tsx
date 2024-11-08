import React from "react";
import { SectionList, StyleSheet, View } from "react-native";
import { groupByDate, hp } from "@/utils";
import { PasswordItem_Data } from "@/constants";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppHeader, AppText, GradientWrapper, PasswordItem } from "@/components";

const Password = () => {
  const sections = groupByDate(PasswordItem_Data);

  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader title="Your Passwords" />
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PasswordItem item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <AppText text={title} type="default" />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={true}
      />
    </GradientWrapper>
  );
};

export default Password;

const styles = StyleSheet.create({
  sectionHeader: {
    paddingVertical: hp(0.5),
    marginBottom: Spacing.sm,
    // backgroundColor: colorPalette.primaryBg.primaryDarkGreen,
  },
});
