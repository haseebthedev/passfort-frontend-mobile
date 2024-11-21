import React, { useRef, useState } from "react";
import { SectionList, StyleSheet, View, ViewToken } from "react-native";
import { groupByDate, hp } from "@/utils";
import { PasswordItem_Data } from "@/constants";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppHeader, AppText, GradientWrapper, PasswordItem } from "@/components";

const Password = () => {
  const sections = groupByDate(PasswordItem_Data);
  const [stickyHeader, setStickyHeader] = useState<string | null>(null);

  const viewableItemsConfig = useRef({
    viewableItemsChanged: ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const topSection = viewableItems.find((item: ViewToken) => item.isViewable && item.section);
      if (topSection) {
        setStickyHeader(topSection.section.title);
      }
    },
  });

  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader title="Your Passwords" />
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => (item?.id ? item.id.toString() : `item-${index}`)}
        renderItem={({ item }) => <PasswordItem item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <View style={[styles.sectionHeader, stickyHeader === title && styles.stickyHeader]}>
            <AppText text={title} type="description" />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={true}
        onViewableItemsChanged={viewableItemsConfig.current.viewableItemsChanged}
      />
    </GradientWrapper>
  );
};

export default Password;

const styles = StyleSheet.create({
  sectionHeader: {
    paddingVertical: hp(0.5),
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  stickyHeader: {
    backgroundColor: colorPalette.primaryBg.primaryDarkGreen,
  },
});
