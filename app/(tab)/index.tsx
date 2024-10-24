import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { wp } from "@/utils";
import { Spacing } from "@/styles";
import { PasswordCard_Data, PasswordItem_Data } from "@/constants";
import { AppLogo, AppText, GradientWrapper, PasswordCard, PasswordItem, RoundButton } from "@/components";

const Home = () => {
  return (
    <GradientWrapper>
      <View style={styles.greetingContainer}>
        <View>
          <AppText text="Hello Username" type="defaultSemiBold" />
          <AppText text="Welcome to Password Manager" type="lightSubTitle" />
        </View>

        <AppLogo style={styles.appLogo} />
      </View>

      <View style={styles.passwordCards}>
        <View style={styles.passwordsHeader}>
          <View>
            <AppText text="Manage" type="lightSubTitle" />
            <AppText text="Your Passwords" type="defaultSemiBold" />
          </View>
          <RoundButton />
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
      <AppText text="RecentlyAdded" type="defaultSemiBold" style={styles.heading} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={PasswordItem_Data}
        renderItem={({ item }) => <PasswordItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
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
    paddingHorizontal: Spacing.md,
  },
  passwordsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
  },
  appLogo: {
    width: wp(20),
    height: wp(20),
  },
  passwordCards: {},
  passwordCardsContainer: {
    marginBottom: Spacing.lg,
    gap: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  heading: {
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  passwordItemsContainer: {
    paddingHorizontal: Spacing.md,
  },
});
