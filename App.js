import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFonts } from 'expo-font';

//Import pages
import Home from './src/pages/Home';
import Library from './src/pages/Library';
import Account from './src/pages/Account';

//Create bottom tab 
const Tab = createBottomTabNavigator();


const App = () => {
  const [loaded] = useFonts({
    NotoSerifRegular: require('./assets/fonts/NotoSerif-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    //Provide safe area (notch etc.)
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "book-open";
            } 
            else if (route.name === "Library") {
              iconName = "bookshelf";
            } 
            else if (route.name === "Account") {
              iconName = "account";
            }

            return (
              <MaterialCommunityIcons
                name={iconName}
                size={30}
                color={color}
                style={{ height: 30 }}
              />
            );
          },
          headerTitleAlign: "center",
          tabBarActiveTintColor: "#020202",
          tabBarStyle: {
            borderTopWidth: 0,
            elevation: 0,
            height:80
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "NotoSerifRegular"
          },
          headerTitleStyle: {
          },
          headerShown: false,
        })}
        initialRouteName = "Home"
        >
          <Tab.Screen name = "Library" component={Library}></Tab.Screen>
          <Tab.Screen name = "Home" component={Home}></Tab.Screen>
          <Tab.Screen name = "Account" component={Account}></Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App 
