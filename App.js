import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { StripeProvider } from '@stripe/stripe-react-native';


import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';



import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import TicketsScreen from "./screens/TicketsScreen";
import ProfilScreen from "./screens/ProfilScreen";
import MovieScreen from "./screens/MovieScreen"
import BookScreen from "./screens/BookScreen"
import PaymentScreen from "./screens/PaymentScreen"

import { Ionicons } from "@expo/vector-icons";

const publishableKey = "pk_test_51P6JdE09YXY9riuTtwoel6ypg4GYkBee1CpkdmAt4ADvjDdSoNy7xTw6B5mth84BBYVFt0opwN5L3Rxrxp8EI1Ub00565bikyU";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();




function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeTab" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Movie" component={MovieScreen} options={{
        headerStyle: {
          backgroundColor: '#18171C',
        },
        headerTintColor: '#F7BB0D',
        headerTitle: "Movie Description",
        headerTitleAlign: 'center',
      }} />
      <Stack.Screen name="Booking" component={BookScreen} options={{
        headerStyle: {
          backgroundColor: '#18171C',
        },
        headerTintColor: '#F7BB0D',
        headerTitle: "Movie Tickets",
        headerTitleAlign: 'center',
      }} />
      <Stack.Screen name="Payment" component={PaymentScreen} options={{
        headerStyle: {
          backgroundColor: '#18171C',
        },
        headerTintColor: '#F7BB0D',
        headerTitle: "Payment Informations",
        headerTitleAlign: 'center',
      }} />
    </Stack.Navigator>
  );
}


function SearchStack() {
  return (
    <Stack.Navigator>
      <Tab.Screen name="SearchTab" component={SearchScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Movie" component={MovieScreen} options={{
        headerStyle: {
          backgroundColor: '#18171C',
        },
        headerTintColor: '#F7BB0D',
        headerTitle: "Movie Description",
        headerTitleAlign: 'center',
      }} />
      <Stack.Screen name="Booking" component={BookScreen} options={{
        headerStyle: {
          backgroundColor: '#18171C',
        },
        headerTintColor: '#F7BB0D',
        headerTitle: "Movie Tickets",
        headerTitleAlign: 'center',
      }} />
      <Stack.Screen name="Payment" component={PaymentScreen} options={{
        headerStyle: {
          backgroundColor: '#18171C',
        },
        headerTintColor: '#F7BB0D',
        headerTitle: "Payment Informations",
        headerTitleAlign: 'center',
      }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <StripeProvider
      publishableKey={publishableKey}
      urlScheme="cinemabox" 
    >
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Search") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === "Tickets") {
              iconName = focused ? "ticket" : "ticket-outline";
            } else if (route.name === "Profil") {
              iconName = focused ? "person" : "person-outline";
            }
            return <Ionicons name={iconName} size={26} color={color} />;
          },
          tabBarActiveTintColor: "#F7BB0D",
          tabBarInactiveTintColor: "gray",
          tabBarShowLabel: false,
          tabBarStyle: { 
            backgroundColor: '#18171C',
            borderTopWidth: 0
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} options={{headerShown: false}}/>
        <Tab.Screen name="Search" component={SearchStack} options={{headerShown: false}}/>
        <Tab.Screen name="Tickets" component={TicketsScreen} options={{headerShown: false}}/>
        <Tab.Screen name="Profil" component={ProfilScreen} options={{headerShown: false}}/>
      </Tab.Navigator>
    </NavigationContainer>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
});
