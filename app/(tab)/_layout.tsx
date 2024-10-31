import React from "react";
import { StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { AppFont, hp } from "@/utils";
import { colorPalette, Fonts, iconSize, Spacing } from "@/styles";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colorPalette.primaryBg.secondaryLightGreen,
        tabBarInactiveTintColor: colorPalette.primaryBg.primaryGrey,
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <FontAwesome size={iconSize} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Password"
        options={{
          title: "Password",
          tabBarIcon: ({ color }) => <MaterialIcons size={iconSize} name="shield" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <Ionicons size={iconSize} name="person" color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: colorPalette.primaryBg.primaryDarkGreen,
    paddingVertical: hp(1.4),
    height: hp(10),
    borderTopWidth: 0,
  },
  tabBarLabelStyle: {
    marginBottom: Spacing.sm,
    fontSize: Fonts.size.sm,
    fontFamily: AppFont.regular,
  },
});
