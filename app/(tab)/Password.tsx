import React, { useEffect, useRef, useState } from "react";
import { RefreshControl, SectionList, StyleSheet, View, ViewToken } from "react-native";
import { groupByDate, hp } from "@/utils";
import { usePasswordStore } from "@/store";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppHeader, AppText, GradientWrapper, LoadingIndicator, PasswordItem } from "@/components";
import { ListPagination, PasswordItemType } from "@/interfaces";

const LIMIT: number = 10;

const Password = () => {
  const { getPasswords, isLoading } = usePasswordStore();

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [stickyHeader, setStickyHeader] = useState<string | null>(null);
  const [state, setState] = useState<ListPagination<PasswordItemType>>({
    docs: [],
    page: 1,
    hasNextPage: false,
    listRefreshing: false,
  });

  const viewableItemsConfig = useRef({
    viewableItemsChanged: ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const topSection = viewableItems.find((item: ViewToken) => item.isViewable && item.section);
      if (topSection) {
        setStickyHeader(topSection.section.title);
      }
    },
  });

  const getAllPasswords = async (page = 1) => {
    setState((prev) => ({
      ...prev,
      listRefreshing: true,
    }));

    try {
      const response = await getPasswords({ page, limit: LIMIT });

      if (response?.docs) {
        setState((prev) => ({
          ...prev,
          docs: page === 1 ? response.docs : [...prev.docs, ...response.docs],
          page: response.hasNextPage ? page + 1 : prev.page,
          hasNextPage: response.hasNextPage,
          listRefreshing: false,
        }));
      }
    } catch (error) {
      console.error("Error fetching passwords:", error);
      setState((prev) => ({ ...prev, listRefreshing: false }));
    }
  };

  const loadMorePasswords = () => {
    if (!state.listRefreshing && state.hasNextPage) {
      getAllPasswords(state.page);
    }
  };

  const sections = groupByDate(state.docs);

  const onRefresh = async () => {
    if (state.listRefreshing || refreshing) {
      return;
    }

    setRefreshing(true);

    try {
      const response = await getPasswords({ page: 1, limit: LIMIT });

      if (response?.docs) {
        setState({
          docs: response.docs,
          page: response.hasNextPage ? 2 : 1,
          hasNextPage: response.hasNextPage,
          listRefreshing: false,
        });
      }
    } catch (error) {
      console.error("Error refreshing passwords:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const renderLoader = () => {
    return state.listRefreshing && <LoadingIndicator />;
  };

  useEffect(() => {
    getAllPasswords(1);

    return () => {
      setState({ ...state, docs: [], page: 1, hasNextPage: false });
    };
  }, []);

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
        onEndReached={loadMorePasswords}
        onEndReachedThreshold={0.5}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListFooterComponent={renderLoader}
        ListEmptyComponent={() =>
          !state.listRefreshing &&
          !refreshing &&
          state.docs.length === 0 && (
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
