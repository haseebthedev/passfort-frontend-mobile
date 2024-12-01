import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { router } from "expo-router";
import { wp } from "@/utils";
import { Screens } from "@/enums";
import { AppFont } from "@/utils";
import { useAuthStore } from "@/store";
import { colorPalette, Spacing } from "@/styles";
import { PasswordCard_Data, PasswordItem_Data } from "@/constants";
import { AppLogo, AppText, GradientWrapper, PasswordCard, PasswordItem, RoundButton, SearchInput } from "@/components";

const HeaderComponent = () => {
  const { user } = useAuthStore();
  const [searchText, setSearchText] = useState<string>("");

  return (
    <View>
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
          data={PasswordCard_Data}
          renderItem={({ item }) => <PasswordCard item={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.passwordCardsContainer}
        />
      </View>
      <AppText text="Recently Added" type="primaryHeading" style={styles.heading} />
    </View>
  );
};

const Home = () => {
  return (
    <GradientWrapper>
      <FlatList
        data={PasswordItem_Data}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <PasswordItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => <HeaderComponent />}
        contentContainerStyle={styles.passwordItemsContainer}
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
    // marginTop: Spacing.lg,
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
  passwordItemsContainer: {
    paddingHorizontal: Spacing.md,
  },
});
