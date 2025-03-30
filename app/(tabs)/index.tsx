import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
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
  return (
    <NavigationContainer>
      {Platform.OS === 'ios' ? <TabNavigator /> : <DrawerNavigator />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
