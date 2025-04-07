import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Platform, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import axios from 'axios';

// Fetching data function
const fetchData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};

// Planets Screen
const PlanetsScreen = () => {
  const [planets, setPlanets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData('https://swapi.dev/api/planets/')
      .then((data) => {
        setPlanets(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={planets}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
};

// Spaceships Screen
const SpaceshipsScreen = () => {
  const [spaceships, setSpaceships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData('https://swapi.dev/api/starships/')
      .then((data) => {
        setSpaceships(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={spaceships}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
};

// Films Screen
const FilmsScreen = () => {
  const [films, setFilms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData('https://swapi.dev/api/films/')
      .then((data) => {
        setFilms(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={films}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
};

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
  return Platform.OS === 'ios' ? <TabNavigator /> : <DrawerNavigator />;
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
