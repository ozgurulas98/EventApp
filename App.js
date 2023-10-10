import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";
import SearchScreen from "./src/screens/SearchScreen";
import HomeScreen from "./src/screens/HomeScreen";
import EventDetailScreen from "./src/screens/EventDetailScreen";
import FilterScreen from "./src/screens/FilterScreen";
import { EventProvider } from "./EventContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainScreen = () => {
  return (
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
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <EventProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainScreen">
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="EventDetail"
            component={EventDetailScreen}
            options={{ headerTitle: "Etkinlik Detayları" }}
          />
          <Stack.Screen
            name="FilterScreen"
            component={FilterScreen}
            options={{
              headerTitle: "Filtre",
              headerTitleStyle: { fontSize: 18 },
            }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </EventProvider>
  );
};

export default App;
