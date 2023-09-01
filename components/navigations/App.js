import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import SearchScreen from "../pages/SearchScreen";
import HomeScreen from "../pages/HomeScreen";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconColor = focused ? "black" : "#bdbdbd";
            let iconName;

            if (route.name === "Search") {
              iconName = "search"; // SearchScreen için arama ikonu
            } else if (route.name === "Home") {
              iconName = "home"; // HomeScreen için ev ikonu
            }

            return <FontAwesome name={iconName} size={24} color={iconColor} />;
          },
          tabBarLabel: "",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        {/* Diğer sayfaları burada ekleyebilirsiniz */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
