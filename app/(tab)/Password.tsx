import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { PasswordItemType } from "@/interfaces";
import { PasswordItem_Data } from "@/constants";
import { LayoutStyles, Spacing } from "@/styles";
import { AppHeader, GradientWrapper, PasswordItem } from "@/components";

const Password = () => {
  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader title="Your Passwords" />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={PasswordItem_Data}
        renderItem={({ item }: { item: PasswordItemType }) => <PasswordItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </GradientWrapper>
  );
};

export default Password;

const styles = StyleSheet.create({
  heading: {
    marginBottom: Spacing.md,
  },
});
