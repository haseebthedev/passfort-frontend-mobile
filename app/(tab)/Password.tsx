import React, { useEffect, useRef, useState } from "react";
import { RefreshControl, SectionList, StyleSheet, View, ViewToken } from "react-native";
import { groupByDate, hp } from "@/utils";
import { usePasswordStore } from "@/store";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppHeader, AppText, GradientWrapper, LoadingIndicator, PasswordItem } from "@/components";

const Password = () => {
  const { getPasswords, passwords, pagination, isLoading } = usePasswordStore();

  const sections = groupByDate(passwords);
  const [page, setPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [stickyHeader, setStickyHeader] = useState<string | null>(null);

  const viewableItemsConfig = useRef({
    viewableItemsChanged: ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const topSection = viewableItems.find((item: ViewToken) => item.isViewable && item.section);
      if (topSection) {
        setStickyHeader(topSection.section.title);
      }
    },
  });

  const loadMorePasswords = () => {
    if (pagination?.hasNextPage && !isLoading) {
      const nextPage = page + 1;
      setPage(nextPage);
      getPasswords(nextPage);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    await getPasswords(1);
    setRefreshing(false);
  };

  useEffect(() => {
    getPasswords(1);
  }, []);

  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader title="Your Passwords" />
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => (item?._id ? item._id.toString() : `item-${index}`)}
        renderItem={({ item }) => <PasswordItem item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <View style={[styles.sectionHeader, stickyHeader === title && styles.stickyHeader]}>
            <AppText text={title} type="description" />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={true}
        onViewableItemsChanged={viewableItemsConfig.current.viewableItemsChanged}
        onEndReached={loadMorePasswords}
        onEndReachedThreshold={0.5}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListFooterComponent={isLoading ? <LoadingIndicator color={colorPalette.gradientBg.lightGreen} /> : null}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <AppText text="No passwords found!" type="default" />
          </View>
        }
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.md,
  },
});
