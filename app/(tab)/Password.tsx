import { FlatList, StyleSheet } from "react-native";
import React from "react";
import { LayoutStyles, Spacing } from "@/styles";
import { PasswordItem_Data } from "@/constants";
import { AppText, GradientWrapper, PasswordItem } from "@/components";

const Password = () => {
  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <AppText text="Your Passwords" type="defaultSemiBold" style={styles.heading} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={PasswordItem_Data}
        renderItem={({ item }) => <PasswordItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </GradientWrapper>
  );
};

export default Password;

const styles = StyleSheet.create({
  heading: {
    marginVertical: Spacing.md,
  },
});
