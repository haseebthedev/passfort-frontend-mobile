import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { hp } from "@/utils";
import { colorPalette, iconSize } from "@/styles";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorPalette.primaryBg.shade01,
        tabBarInactiveTintColor: colorPalette.primaryBg.shade04,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colorPalette.primaryBg.shade02,
          paddingVertical: hp(0.5),
          height: hp(8),
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          marginBottom: hp(1),
        },
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
