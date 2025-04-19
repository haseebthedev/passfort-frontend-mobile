import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  RefreshControl,
  SectionList,
  StyleSheet,
  View,
  ViewToken,
} from "react-native";
import { groupByDate, hp } from "@/utils";
import { usePasswordStore } from "@/store";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import {
  AppHeader,
  AppText,
  GradientWrapper,
  LoadingIndicator,
  PasswordItem,
} from "@/components";
import { ListPagination, PasswordItemType } from "@/interfaces";
import { router, useFocusEffect } from "expo-router";

const LIMIT: number = 10;

const Password = () => {
  const { getPasswords, isLoading, passwords, hasNextPage, currentPage, resetPasswords } = usePasswordStore();

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [stickyHeader, setStickyHeader] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const viewableItemsConfig = useRef({
    viewableItemsChanged: ({
      viewableItems,
    }: {
      viewableItems: ViewToken[];
    }) => {
      const topSection = viewableItems.find(
        (item: ViewToken) => item.isViewable && item.section
      );
      if (topSection) {
        setStickyHeader(topSection.section.title);
      }
    },
  });

  const loadMorePasswords = async () => {
    if (!isLoading && !isLoadingMore && hasNextPage) {
      setIsLoadingMore(true);
      try {
        await getPasswords({ page: currentPage + 1, limit: LIMIT });
      } finally {
        setIsLoadingMore(false);
      }
    }
  };

  const sections = groupByDate(passwords);

  const onRefresh = async () => {
    if (isLoading || refreshing) {
      return;
    }

    setRefreshing(true);
    resetPasswords();
    await getPasswords({ page: 1, limit: LIMIT });
    setRefreshing(false);
  };

  const renderLoader = () => {
    if (isLoadingMore) {
      return <LoadingIndicator />;
    }
    return null;
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     onRefresh();
  //   }, [])
  // );

  useEffect(() => {
    getPasswords({ page: 1, limit: LIMIT });

    return () => {
      resetPasswords();
    };
  }, []);

  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader title="Your Passwords" />
      <SectionList
        sections={sections}
        keyExtractor={(item, index) =>
          item?._id ? item._id.toString() : `item-${index}`
        }
        renderItem={({ item }) => <PasswordItem item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <View
            style={[
              styles.sectionHeader,
              stickyHeader === title && styles.stickyHeader,
            ]}
          >
            <AppText text={title} type="description" />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={true}
        onViewableItemsChanged={
          viewableItemsConfig.current.viewableItemsChanged
        }
        onEndReached={loadMorePasswords}
        onEndReachedThreshold={0.2}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={renderLoader}
        ListEmptyComponent={() =>
          !isLoading &&
          !refreshing &&
          passwords.length === 0 && (
            <View style={styles.emptyContainer}>
              <AppText text="No passwords found!" type="default" />
            </View>
          )
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
