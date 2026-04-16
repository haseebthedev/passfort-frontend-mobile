import React, { memo } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { router } from "expo-router";
import { wp } from "@/utils";
import { Screens } from "@/enums";
import { AppFont } from "@/utils";
import { useAuthStore } from "@/store";
import { PasswordGroup } from "@/interfaces";
import { usePasswordManagement, useTheme } from "@/hooks";
import { colorPalette, Spacing, theme } from "@/styles";
import {
  AppLogo,
  AppText,
  GradientWrapper,
  LoadingIndicator,
  PasswordCategory,
  PasswordItem,
  RoundButton,
  SearchInput,
} from "@/components";

interface HeaderComponentI {
  groupedPassword: PasswordGroup[];
}

const HeaderComponent = memo(({ groupedPassword }: HeaderComponentI) => {
  return (
    <>
      <>
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
          data={groupedPassword ?? []}
          renderItem={({ item }) => <PasswordCategory item={item} />}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.passwordCategories}
          ListEmptyComponent={<AppText text="No Categories Found!" type="default" />}
        />
      </>
      <AppText text="Recently Added" type="primaryHeading" style={styles.heading} />
    </>
  );
});

const Home = () => {
  const { theme } = useTheme();

  const { user } = useAuthStore();
  const { groupedPassword, searchText, setSearchText, state, isLoading, recentPasswords, handleRefresh } = usePasswordManagement();

  return (
    <GradientWrapper>
      <View style={styles.greetingContainer}>
        <View>
          <AppText text={`Hello ${user?.name ?? "Username"}`} type="heading" numberOfLines={1} style={styles.username} />
          <AppText text="Welcome to Password Manager" type="regularSubHeading" style={styles.welcomeText} />
        </View>
        <AppLogo style={styles.appLogo} />
      </View>

      <SearchInput value={searchText} onChangeText={setSearchText} />

      <FlatList
        data={recentPasswords ?? []}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <PasswordItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => <HeaderComponent groupedPassword={groupedPassword} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            {isLoading ? (
              <LoadingIndicator />
            ) : !state.listRefreshing ? (
              <AppText
                text="Your most recently created items will appear here for easy access."
                type="placeholderText"
                style={{ textAlign: "center" }}
              />
            ) : null}
          </View>
        }
        refreshing={state.listRefreshing}
        onRefresh={handleRefresh}
      />
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
  passwordCategories: {
    marginBottom: Spacing.lg,
    gap: Spacing.md,
    paddingBottom: Spacing.xxs,
  },
  heading: {
    marginBottom: Spacing.md,
    fontFamily: AppFont.semiBold,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: Spacing.md,
  },
  recentPasswordsContainer: {
    marginBottom: Spacing.lg,
  },
  recentPasswordsList: {
    gap: Spacing.md,
  },
});
