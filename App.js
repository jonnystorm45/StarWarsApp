import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screen components
const PlanetsScreen = () => (
  <View style={styles.screenContainer}>
    <Text>Planets Screen</Text>
  </View>
);

const SpaceshipsScreen = () => (
  <View style={styles.screenContainer}>
    <Text>Spaceships Screen</Text>
  </View>
);

const FilmsScreen = () => (
  <View style={styles.screenContainer}>
    <Text>Films Screen</Text>
  </View>
);

// Create navigators
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Bottom Tab Navigator (For iOS)
const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Planets" component={PlanetsScreen} />
    <Tab.Screen name="Spaceships" component={SpaceshipsScreen} />
    <Tab.Screen name="Films" component={FilmsScreen} />
  </Tab.Navigator>
);

// Drawer Navigator (For Android)
const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Planets" component={PlanetsScreen} />
    <Drawer.Screen name="Spaceships" component={SpaceshipsScreen} />
    <Drawer.Screen name="Films" component={FilmsScreen} />
  </Drawer.Navigator>
);

export default function App() {
  // Assuming that NavigationContainer is already handled at a higher level (e.g. expo-router)
  return (
    Platform.OS === 'ios' ? <TabNavigator /> : <DrawerNavigator />
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  screenText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
