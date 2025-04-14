import React, { memo, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { router } from "expo-router";
import { wp } from "@/utils";
import { Screens } from "@/enums";
import { AppFont } from "@/utils";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { useAuthStore, usePasswordStore } from "@/store";
import { ListPagination, PasswordGroup, PasswordItemType } from "@/interfaces";
import {
  AppLogo,
  AppText,
  GradientWrapper,
  LoadingIndicator,
  PasswordCard,
  PasswordItem,
  RoundButton,
  SearchInput,
} from "@/components";

const LIMIT: number = 10;

interface HeaderComponentI {
  groupedPassword: PasswordGroup[];
}

const HeaderComponent = memo(({ groupedPassword }: HeaderComponentI) => {
  return (
    <View>
      <View style={styles.passwordCards}>
        <View style={styles.passwordsHeader}>
          <View>
            <AppText text="Manage" type="label" style={styles.label} />
            <AppText text="Your Passwords" type="heading" />
          </View>
          <RoundButton iconName="plus" onPress={() => router.push(Screens.CreatePassword)} />
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={groupedPassword}
          renderItem={({ item }) => <PasswordCard item={item} />}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.passwordCardsContainer}
        />
      </View>
      <AppText text="Recently Added" type="primaryHeading" style={styles.heading} />
    </View>
  );
});

const Home = () => {
  const { user } = useAuthStore();

  const { getPasswords, getGroupedPasswords, isLoading } = usePasswordStore();

  const [groupedPassword, setGroupedPassword] = useState<PasswordGroup[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [state, setState] = useState<ListPagination<PasswordItemType>>({
    docs: [],
    page: 1,
    hasNextPage: false,
    listRefreshing: false,
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

  const getAllGroupedPasswords = async () => {
    try {
      const response = await getGroupedPasswords();
      if (response.result) {
        setGroupedPassword(response.result);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleRefresh = async () => {
    setState((prev) => ({ ...prev, listRefreshing: true }));
    await Promise.all([getAllGroupedPasswords(), getAllPasswords(1)]);
    setState((prev) => ({ ...prev, listRefreshing: false }));
  };

  useEffect(() => {
    getAllGroupedPasswords();
  }, []);

  useEffect(() => {
    getAllPasswords(1);

    return () => {
      setState({ ...state, docs: [], page: 1, hasNextPage: false });
    };
  }, []);

  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <View style={styles.greetingContainer}>
        <View>
          <AppText
            text={`Hello ${user?.name ?? "Username"}`}
            type="heading"
            numberOfLines={1}
            style={styles.username}
          />
          <AppText text="Welcome to Password Manager" type="regularSubHeading" style={styles.welcomeText} />
        </View>
        <AppLogo style={styles.appLogo} />
      </View>

      <SearchInput value={searchText} onChangeText={setSearchText} />
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={state.docs}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <PasswordItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={() => <HeaderComponent groupedPassword={groupedPassword} />}
          ListEmptyComponent={
            !state.listRefreshing ? (
              <View style={styles.emptyContainer}>
                <AppText text="No passwords found!" type="default" />
              </View>
            ) : null
          }
          refreshing={state.listRefreshing}
          onRefresh={handleRefresh}
        />
      )}
    </GradientWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  greetingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.sm,
  },
  username: {
    width: wp(65),
    fontFamily: AppFont.bold,
  },
  welcomeText: {
    marginTop: Spacing.xxs,
    color: colorPalette.primaryBg.secondayGrey,
  },
  label: {
    marginBottom: Spacing.xxs,
    color: colorPalette.primaryBg.secondayGrey,
  },
  passwordsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.md,
  },
  appLogo: {
    width: wp(17),
    height: wp(17),
  },
  passwordCards: {},
  passwordCardsContainer: {
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  heading: {
    marginBottom: Spacing.md,
    fontFamily: AppFont.semiBold,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.md,
  },
});
