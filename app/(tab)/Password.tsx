import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { hp } from "@/utils";
import { LayoutStyles } from "@/styles";
import { PasswordItemType } from "@/interfaces";
import { PasswordItem_Data } from "@/constants";
import { AppHeader, GradientWrapper, PasswordItem } from "@/components";

const Password = () => {
  return (
    <GradientWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader title="Your Passwords" containerStyle={styles.heading} />
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
    marginBottom: hp(2.9),
  },
});
