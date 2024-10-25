import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { hp, wp } from "@/utils";
import { colorPalette, Spacing } from "@/styles";
import { PasswordCard_Data, PasswordItem_Data } from "@/constants";
import { AppLogo, AppText, GradientWrapper, PasswordCard, PasswordItem, RoundButton } from "@/components";

const HeaderComponent = () => {
  return (
    <View>
      <View style={styles.greetingContainer}>
        <View>
          <AppText text="Hello Username" type="heading" />
          <AppText
            text="Welcome to Password Manager"
            type="regularSubHeading"
            style={{ marginTop: Spacing.xxs, color: colorPalette.primaryBg.secondayGrey }}
          />
        </View>

        <AppLogo style={styles.appLogo} />
      </View>

      <View style={styles.passwordCards}>
        <View style={styles.passwordsHeader}>
          <View>
            <AppText
              text="Manage"
              type="label"
              style={{
                marginBottom: Spacing.xxs,
                color: colorPalette.primaryBg.secondayGrey,
              }}
            />
            <AppText text="Your Passwords" type="heading" />
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
      <AppText text="Recently Added" type="primaryHeading" style={styles.heading} />
    </View>
  );
};

const Home = () => {
  return (
    <GradientWrapper>
      <FlatList
        data={PasswordItem_Data}
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
  },
  passwordsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Spacing.lg,
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
  },
  passwordItemsContainer: {
    paddingHorizontal: Spacing.md,
  },
});
