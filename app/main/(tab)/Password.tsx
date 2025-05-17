import React, { useEffect, useRef, useState } from "react";
import {
  RefreshControl,
  SectionList,
  StyleSheet,
  View,
  ViewToken,
} from "react-native";
import { groupByDate, hp } from "@/utils";
import { usePasswordStore } from "@/store";
import { Spacing } from "@/styles";
import {
  AppHeader,
  AppText,
  GradientWrapper,
  LoadingIndicator,
  PasswordItem,
} from "@/components";
import { useTheme } from "@/hooks";
import { Theme } from "@/interfaces";

const LIMIT: number = 10;

const Password = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const {
    getPasswords,
    isLoading,
    passwords,
    hasNextPage,
    currentPage,
    resetPasswords,
  } = usePasswordStore();

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

  useEffect(() => {
    getPasswords({ page: 1, limit: LIMIT });

    return () => {
      resetPasswords();
    };
  }, []);

  return (
    <GradientWrapper>
      <AppHeader title="Your Passwords" />
      <SectionList
        sections={sections}
        keyExtractor={(item, index) =>
          item?.id ? item.id.toString() : `item-${index}`
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

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    sectionHeader: {
      paddingVertical: hp(0.5),
      paddingHorizontal: Spacing.md,
      marginBottom: Spacing.sm,
    },
    stickyHeader: {
      backgroundColor: theme.stickyHeaderBg,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: Spacing.md,
    },
  });
